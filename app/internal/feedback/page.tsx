"use client";

// app/internal/feedback/page.tsx
// Unlisted internal dashboard for viewing anonymous feedback totals.
// Not linked from Nav. Gated by a passphrase (FEEDBACK_VIEW_PASSPHRASE).

import { useState } from "react";

interface Comment {
  vote: "yes" | "somewhat" | "no";
  comment: string;
  at: string;
}

interface FeedbackData {
  totals: { yes: number; somewhat: number; no: number };
  comments: Comment[];
}

export default function InternalFeedbackPage() {
  const [passphrase, setPassphrase] = useState("");
  const [data, setData] = useState<FeedbackData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/feedback?source=assistant`, {
        headers: { "x-feedback-passphrase": passphrase },
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Something went wrong.");
        setData(null);
      } else {
        setData(json);
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "3rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}
        >
          Assistant Feedback
        </h1>

        {!data && (
          <div
            style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}
          >
            <input
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder="Passphrase"
              onKeyDown={(e) => e.key === "Enter" && fetchData()}
              style={{
                flex: 1,
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={fetchData}
              disabled={loading || !passphrase}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                backgroundColor: "#2E8B6A",
                color: "#fff",
                fontWeight: 600,
              }}
            >
              {loading ? "Loading…" : "View"}
            </button>
          </div>
        )}

        {error && (
          <p style={{ color: "#e05252", marginBottom: "1rem" }}>{error}</p>
        )}

        {data && (
          <>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
              {(["yes", "somewhat", "no"] as const).map((v) => (
                <div
                  key={v}
                  style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    textAlign: "center",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <div style={{ fontSize: "1.75rem", fontWeight: 700 }}>
                    {data.totals[v]}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#666",
                      textTransform: "capitalize",
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>

            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
              }}
            >
              Comments ({data.comments.length})
            </h2>
            {data.comments.length === 0 ? (
              <p style={{ color: "#888", fontSize: "0.9rem" }}>
                No comments yet.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {data.comments.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "0.75rem",
                      padding: "0.9rem",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#999",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {c.vote} · {new Date(c.at).toLocaleString()}
                    </div>
                    <div style={{ fontSize: "0.9rem" }}>{c.comment}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
