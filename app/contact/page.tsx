"use client";

import { useState } from "react";
import Nav from "../components/Nav";

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      access_key: "d9432812-9e44-4847-bc09-e30828950547",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      subject: "IBD Compass – Feedback / Review Request",
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setStatus(json.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={{ backgroundColor: "var(--bg-page)", minHeight: "100vh" }}>
      <Nav active="/contact" />

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1
            className="text-3xl font-bold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Get in Touch
          </h1>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            We welcome feedback from patients, carers, and healthcare
            professionals — including gastroenterologists interested in
            reviewing the content.
          </p>
        </div>

        {/* Data handling note */}
        <div
          className="rounded-xl px-5 py-4 mb-6 text-sm leading-relaxed"
          style={{
            backgroundColor: "var(--bg-accent)",
            color: "var(--text-secondary)",
          }}
        >
          <p>
            We only use your name and email to reply to you, and your message is
            sent via Web3Forms to our team inbox — it isn&apos;t stored anywhere
            else or shared with third parties. Please don&apos;t include
            personal medical details here; this form isn&apos;t reviewed by a
            clinician.
          </p>
          <p className="mt-3">
            Have a health question? See our{" "}
            <a
              href="/about#privacy"
              className="underline"
              style={{ color: "#2E8B6A" }}
            >
              Privacy
            </a>{" "}
            statement for more.
          </p>
          <a
            href="/ask-the-assistant"
            className="inline-block mt-3 px-4 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: "#2E8B6A", color: "#ffffff" }}
          >
            Ask the Assistant instead →
          </a>
        </div>

        {/* Form card */}
        <div
          className="rounded-2xl p-8 shadow-sm"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
          }}
        >
          {status === "success" ? (
            /* Success state */
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Message sent
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Thanks for reaching out. We&apos;ll be in touch soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm underline"
                style={{ color: "var(--text-muted)" }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "var(--bg-page)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "var(--bg-page)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Your feedback, question, or review request…"
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: "var(--bg-page)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              {/* Error message */}
              {status === "error" && (
                <p className="text-sm" style={{ color: "#e05252" }}>
                  Something went wrong. Please try again or email us directly at
                  ibdcompass@proton.me
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 rounded-lg text-sm font-semibold transition-opacity"
                style={{
                  backgroundColor: "#2E8B6A",
                  color: "#ffffff",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>

        {/* Fallback note */}
        <p
          className="text-center text-sm mt-6"
          style={{ color: "var(--text-muted)" }}
        >
          Prefer email?{" "}
          <a
            href="mailto:ibdcompass@proton.me"
            style={{ color: "#2E8B6A" }}
            className="underline"
          >
            ibdcompass@proton.me
          </a>
        </p>
      </main>

      {/* Footer — matches all other pages */}
      <footer
        className="mt-16 py-8 text-center text-sm"
        style={{
          backgroundColor: "var(--footer-bg)",
          borderTop: "1px solid var(--border-color)",
          color: "var(--text-muted)",
        }}
      >
        <p>
          IBD Compass — For informational purposes only. Always consult your
          gastroenterologist.
        </p>
      </footer>
    </div>
  );
}
