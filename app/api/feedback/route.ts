// app/api/feedback/route.ts
// Anonymous "was this helpful?" feedback — aggregate counts only.
// We deliberately never store the question/answer content alongside a
// vote, to stay consistent with the site's privacy statement that
// Assistant conversations aren't stored beyond the session.

import { NextRequest, NextResponse } from "next/server";
import { redis, redisConfigured } from "../../lib/redis";
import {
  feedbackRatelimit,
  feedbackViewRatelimit,
  getClientIp,
} from "../../lib/ratelimit";

type Vote = "yes" | "somewhat" | "no";
const VALID_VOTES: Vote[] = ["yes", "somewhat", "no"];
const VALID_SOURCES = ["assistant"]; // extend as feedback rolls out elsewhere
const MAX_COMMENT_LENGTH = 500;
const MAX_STORED_COMMENTS = 200;

export async function POST(req: NextRequest) {
  if (!redisConfigured || !redis) {
    return NextResponse.json(
      { success: false, error: "Feedback storage isn't configured yet." },
      { status: 503 },
    );
  }

  if (feedbackRatelimit) {
    const ip = getClientIp(req);
    const { success } = await feedbackRatelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please slow down." },
        { status: 429 },
      );
    }
  }

  let body: { vote?: string; source?: string; comment?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const { vote, source, comment } = body;

  if (!vote || !VALID_VOTES.includes(vote as Vote)) {
    return NextResponse.json(
      { success: false, error: "Invalid vote." },
      { status: 400 },
    );
  }
  if (!source || !VALID_SOURCES.includes(source)) {
    return NextResponse.json(
      { success: false, error: "Invalid source." },
      { status: 400 },
    );
  }

  await redis.incr(`feedback:${source}:${vote}`);

  if (comment && typeof comment === "string" && comment.trim().length > 0) {
    const trimmed = comment.trim().slice(0, MAX_COMMENT_LENGTH);
    await redis.lpush(
      `feedback:${source}:comments`,
      JSON.stringify({
        vote,
        comment: trimmed,
        at: new Date().toISOString(),
      }),
    );
    // Cap the list so it can't grow unbounded.
    await redis.ltrim(
      `feedback:${source}:comments`,
      0,
      MAX_STORED_COMMENTS - 1,
    );
  }

  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  if (!redisConfigured || !redis) {
    return NextResponse.json(
      { success: false, error: "Feedback storage isn't configured yet." },
      { status: 503 },
    );
  }

  if (feedbackViewRatelimit) {
    const ip = getClientIp(req);
    const { success } = await feedbackViewRatelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many attempts. Please wait a minute and try again.",
        },
        { status: 429 },
      );
    }
  }

  const key = req.headers.get("x-feedback-passphrase");
  if (
    !process.env.FEEDBACK_VIEW_PASSPHRASE ||
    key !== process.env.FEEDBACK_VIEW_PASSPHRASE
  ) {
    return NextResponse.json(
      { success: false, error: "Not authorised." },
      { status: 401 },
    );
  }

  const source = req.nextUrl.searchParams.get("source") || "assistant";

  const [yes, somewhat, no, rawComments] = await Promise.all([
    redis.get<number>(`feedback:${source}:yes`),
    redis.get<number>(`feedback:${source}:somewhat`),
    redis.get<number>(`feedback:${source}:no`),
    redis.lrange(`feedback:${source}:comments`, 0, MAX_STORED_COMMENTS - 1),
  ]);

  const comments = rawComments
    .map((c) => {
      try {
        return JSON.parse(c as string);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return NextResponse.json({
    success: true,
    source,
    totals: { yes: yes || 0, somewhat: somewhat || 0, no: no || 0 },
    comments,
  });
}
