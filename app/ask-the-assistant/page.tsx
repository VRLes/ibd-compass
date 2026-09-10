"use client";
import Nav from "../components/Nav";
import FeedbackWidget from "../components/FeedbackWidget";
// app/ask-the-assistant/page.tsx
// IBD Compass — AI Chat Assistant

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hello, and welcome to IBD Compass. I'm here to help you find accurate, evidence-based information about IBD — explained in plain language, with honesty and care.\n\nWhat would you like to know today?",
};

const EXAMPLE_QUESTIONS = [
  "What diet helps reduce IBD flares?",
  "Are probiotics safe for IBD?",
  "What questions should I ask my gastroenterologist?",
];

function renderMarkdown(content: string, textColor: string) {
  return (
    <div style={{ color: textColor }}>
      {content.split("\n").map((line, i) => {
        if (line.startsWith("### "))
          return (
            <h3
              key={i}
              style={{
                fontWeight: 700,
                fontSize: "0.95rem",
                marginTop: "0.75rem",
                marginBottom: "0.25rem",
              }}
            >
              {line.replace("### ", "")}
            </h3>
          );
        if (line.startsWith("## "))
          return (
            <h2
              key={i}
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                marginTop: "1rem",
                marginBottom: "0.25rem",
              }}
            >
              {line.replace("## ", "")}
            </h2>
          );
        if (line.startsWith("# "))
          return (
            <h1
              key={i}
              style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                marginTop: "1rem",
                marginBottom: "0.25rem",
              }}
            >
              {line.replace("# ", "")}
            </h1>
          );
        if (line.startsWith("- ") || line.startsWith("* "))
          return (
            <li key={i} style={{ marginLeft: "1rem", listStyleType: "disc" }}>
              {renderInlineBold(line.replace(/^[-*] /, ""), `li-${i}`)}
            </li>
          );
        if (line.startsWith("---"))
          return (
            <hr
              key={i}
              style={{
                border: "none",
                borderTop: "1px solid var(--border-color)",
                margin: "0.5rem 0",
              }}
            />
          );
        if (line.trim() === "") return <br key={i} />;
        return (
          <p key={i} style={{ marginBottom: "0.25rem" }}>
            {renderInlineBold(line, `p-${i}`)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineBold(text: string, keyPrefix: string) {
  return text
    .split(/(\*\*[^*]+?\*\*)/g)
    .map((part, idx) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={`${keyPrefix}-${idx}`}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={`${keyPrefix}-${idx}`}>{part}</span>
      ),
    );
}

export default function AskTheAssistant() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastAssistantRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setSpeechSupported(
      !!(window as any).SpeechRecognition ||
        !!(window as any).webkitSpeechRecognition,
    );
  }, []);

  useEffect(() => {
    if (isFocused) {
      if (cycleRef.current) clearInterval(cycleRef.current);
      return;
    }
    cycleRef.current = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % EXAMPLE_QUESTIONS.length);
    }, 4000);
    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [isFocused]);

  useEffect(() => {
    if (messages.length > 1 && lastAssistantRef.current) {
      lastAssistantRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

  const toggleListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-AU";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join("");
      setInput(transcript);
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };
    recognition.onerror = () => {
      setListening(false);
    };
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const clearInput = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
    }
    setInput("");
  };

  const clearConversation = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm sorry, something went wrong. Please try again.",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const placeholder = listening
    ? "Listening..."
    : isFocused
      ? "Ask a question about IBD..."
      : `Try asking: ${EXAMPLE_QUESTIONS[placeholderIndex]}`;

  return (
    <div style={{ backgroundColor: "var(--bg-page)", minHeight: "100vh" }}>
      <Nav active="/ask-the-assistant" />

      {/* Page header */}
      <div className="max-w-2xl mx-auto w-full px-6 pt-10 pb-6">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Ask the Assistant
        </h1>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Ask the Assistant anything — diet and food choices, medications and
          side effects, surgery and stoma care, mindfulness, complementary
          therapies, or the latest research. All answers are evidence-based and
          written in plain language. Available day and night.
        </p>
        <div
          className="mt-4 rounded-xl px-6 py-3"
          style={{ backgroundColor: "var(--bg-accent)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-primary)" }}>
            🌿 This assistant provides information only — not medical advice.
            Always consult your gastroenterologist before making changes to your
            treatment.
          </p>
        </div>
      </div>

      {/* Chat messages — natural page scroll */}
      <div className="max-w-2xl mx-auto w-full px-6 pb-80">
        <div className="flex flex-col gap-4" ref={chatContainerRef}>
          {messages.map((msg, i) => (
            <div
              key={i}
              ref={
                msg.role === "user" && i === messages.length - 2
                  ? lastAssistantRef
                  : null
              }
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className="rounded-2xl px-5 py-3 text-sm leading-relaxed"
                style={{
                  maxWidth: "85%",
                  backgroundColor:
                    msg.role === "user" ? "#2E8B6A" : "var(--bg-card)",
                  color:
                    msg.role === "user" ? "#ffffff" : "var(--text-primary)",
                  border:
                    msg.role === "assistant"
                      ? "1px solid var(--border-color)"
                      : "none",
                }}
              >
                {msg.role === "user" ? (
                  <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
                ) : (
                  renderMarkdown(msg.content, "var(--text-primary)")
                )}
              </div>
              {msg.role === "assistant" && i !== 0 && (
                <div style={{ maxWidth: "85%" }}>
                  <FeedbackWidget source="assistant" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div
                className="rounded-2xl px-5 py-3 text-sm"
                style={{
                  backgroundColor: "var(--bg-card)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-color)",
                }}
              >
                Thinking...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Clear conversation */}
        {messages.length > 1 && (
          <div className="mt-4 text-center">
            <button
              onClick={clearConversation}
              className="text-xs font-semibold hover:opacity-70 transition-opacity"
              style={{ color: "var(--text-secondary)" }}
            >
              ✕ Clear conversation
            </button>
          </div>
        )}
      </div>

      {/* Sticky input bar */}
      <div
        className="fixed bottom-0 left-0 right-0 px-4 py-3 z-50"
        style={{
          backgroundColor: "var(--bg-card)",
          borderTop: "1px solid var(--border-color)",
        }}
      >
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 sm:items-end">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              rows={2}
              className="w-full rounded-xl px-4 py-3 text-sm resize-none focus:outline-none"
              style={{
                backgroundColor: "var(--bg-page)",
                border: `1px solid ${listening ? "#2E8B6A" : "var(--border-color)"}`,
                color: "var(--text-primary)",
                paddingRight: input.trim() ? "2.5rem" : "1rem",
              }}
            />
            <button
              onClick={clearInput}
              title="Clear"
              aria-label="Clear question"
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "#2E8B6A",
                color: "#ffffff",
                lineHeight: 1,
                opacity: input.trim() ? 1 : 0,
                pointerEvents: input.trim() ? "auto" : "none",
              }}
            >
              ✕
            </button>
          </div>

          <div className="flex gap-2 justify-center sm:contents">
            {speechSupported && (
              <div className="flex flex-col items-center gap-1 flex-1 sm:flex-none">
                <button
                  onClick={toggleListening}
                  title={listening ? "Tap to stop" : "Tap to speak"}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center"
                  style={{
                    backgroundColor: listening ? "#922B21" : "var(--bg-page)",
                    color: listening ? "#ffffff" : "#2E8B6A",
                    border: `2px solid ${listening ? "#922B21" : "#2E8B6A"}`,
                    animation: listening
                      ? "micPulse 1.5s ease-in-out infinite"
                      : "none",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 10a7 7 0 0014 0" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="9" y1="22" x2="15" y2="22" />
                  </svg>
                </button>
                <span
                  className="text-xs font-semibold whitespace-nowrap"
                  style={{ color: listening ? "#922B21" : "#2E8B6A" }}
                >
                  {listening ? "Tap to stop" : "Tap to speak"}
                </span>
              </div>
            )}

            <div className="flex flex-col items-center gap-1 flex-1 sm:flex-none">
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-white text-sm font-medium transition-opacity disabled:opacity-50"
                style={{ backgroundColor: "#2E8B6A" }}
              >
                Send
              </button>
              <span
                className="text-xs font-semibold whitespace-nowrap"
                style={{ color: "var(--text-secondary)" }}
              >
                Press Enter to send
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes micPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(146, 43, 33, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(146, 43, 33, 0); }
        }
      `}</style>

      <footer
        className="border-t py-6 text-center"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--footer-bg)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          IBD Compass — Evidence-based information with hope at its heart
        </p>
      </footer>
    </div>
  );
}
