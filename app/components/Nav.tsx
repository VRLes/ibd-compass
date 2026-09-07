"use client";

// app/components/Nav.tsx
// Shared navigation component for all pages

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTheme, Theme } from "../context/ThemeContext";

export default function Nav({ active }: { active: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const themeRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/", label: "Home" },
    { href: "/treatments", label: "Treatments" },
    { href: "/diet", label: "Diet" },
    { href: "/research", label: "Research" },
    { href: "/mindfulness", label: "Mindfulness" },
    { href: "/mental-health", label: "Mental Health" },
    { href: "/doctor-questions", label: "Questions" },
    { href: "/ask-the-assistant", label: "Assistant" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const themes: { value: Theme; label: string; icon: string }[] = [
    { value: "light", label: "Light", icon: "☀️" },
    { value: "soft-dark", label: "Soft Dark", icon: "🌙" },
    { value: "true-dark", label: "True Dark", icon: "🌑" },
    { value: "dark-green", label: "Dark Green", icon: "🌿" },
  ];

  const currentIcon = themes.find((t) => t.value === theme)?.icon ?? "☀️";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      style={{ backgroundColor: "var(--nav-bg)" }}
      className="sticky top-0 z-50 shadow-md"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#6EC6A0" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="3" fill="#6EC6A0" />
            <line
              x1="14"
              y1="2"
              x2="14"
              y2="8"
              stroke="#6EC6A0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="20"
              x2="14"
              y2="26"
              stroke="#6EC6A0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="2"
              y1="14"
              x2="8"
              y2="14"
              stroke="#6EC6A0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="20"
              y1="14"
              x2="26"
              y2="14"
              stroke="#6EC6A0"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span
            className="text-xl font-semibold tracking-wide whitespace-nowrap"
            style={{ color: "#6EC6A0" }}
          >
            IBD Compass
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors hover:text-white"
              style={{
                color: active === link.href ? "#ffffff" : "#A8D8C4",
                fontWeight: active === link.href ? "600" : "400",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Theme Dropdown */}
          <div className="relative" ref={themeRef}>
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full transition-all"
              style={{
                backgroundColor: themeOpen
                  ? "#2E8B6A"
                  : "rgba(255,255,255,0.1)",
                color: "#A8D8C4",
              }}
            >
              <span>{currentIcon}</span>
              <span>Theme</span>
              <span style={{ fontSize: "10px" }}>▾</span>
            </button>

            {themeOpen && (
              <div
                className="absolute right-0 mt-2 w-44 rounded-xl shadow-lg overflow-hidden z-50"
                style={{
                  borderColor: "#2E8B6A",
                  backgroundColor: "var(--nav-bg)",
                }}
              >
                {themes.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => {
                      setTheme(t.value);
                      setThemeOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-opacity-20 text-left"
                    style={{
                      backgroundColor:
                        theme === t.value ? "#1B4F3A" : "transparent",
                      color: theme === t.value ? "#ffffff" : "#A8D8C4",
                    }}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                    {theme === t.value && (
                      <span className="ml-auto text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 transition-all"
            style={{ backgroundColor: "#6EC6A0" }}
          />
          <span
            className="block w-6 h-0.5 transition-all"
            style={{ backgroundColor: "#6EC6A0" }}
          />
          <span
            className="block w-6 h-0.5 transition-all"
            style={{ backgroundColor: "#6EC6A0" }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-4 space-y-3"
          style={{ borderColor: "#2E8B6A", backgroundColor: "var(--nav-bg)" }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm py-2 border-b transition-colors hover:text-white"
              style={{
                color: active === link.href ? "#ffffff" : "#A8D8C4",
                fontWeight: active === link.href ? "600" : "400",
                borderColor: "#2E8B6A",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Theme Picker */}
          <div className="pt-2">
            <p className="text-xs mb-2" style={{ color: "#6EC6A0" }}>
              Theme
            </p>
            <div className="flex gap-2 flex-wrap">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all"
                  style={{
                    backgroundColor:
                      theme === t.value ? "#2E8B6A" : "rgba(255,255,255,0.1)",
                    color: theme === t.value ? "#ffffff" : "#A8D8C4",
                  }}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
