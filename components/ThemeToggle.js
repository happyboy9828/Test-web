"use client";

import { useEffect, useRef, useState } from "react";

// Three-way theme toggle: Light, Dark, System. The choice is persisted in
// localStorage and applied as a data-theme attribute on <html>, so the
// prefers-color-scheme media query never wins over an explicit user pick.
const STORAGE_KEY = "tool-theme";
const THEMES = ["light", "dark", "system"];

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || "system";
      return THEMES.includes(saved) ? saved : "system";
    } catch {
      return "system";
    }
  });
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // On mount, read the saved preference; fall back to system.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Keep the applied class in sync with the state.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  // Close the menu on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    function onClick(e) {
      if (btnRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return;
      setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const label = theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light";
  const icon = theme === "system" ? "🖥️" : theme === "dark" ? "🌙" : "☀️";

  if (!mounted) {
    return (
      <div className="tool-theme">
        <button
          ref={btnRef}
          type="button"
          className="tool-theme-btn"
          aria-label="Toggle theme"
          aria-expanded={false}
          aria-haspopup="menu"
          disabled
        >
          <span className="tool-theme-icon" aria-hidden="true">🖥️</span>
          <span className="tool-theme-label">System</span>
          <span className="tool-theme-chevron" aria-hidden="true">▾</span>
        </button>
      </div>
    );
  }

  return (
    <div className="tool-theme">
      <button
        ref={btnRef}
        type="button"
        className="tool-theme-btn"
        aria-label="Toggle theme"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="tool-theme-icon" aria-hidden="true">{icon}</span>
        <span className="tool-theme-label">{label}</span>
        <span className="tool-theme-chevron" aria-hidden="true">▾</span>
      </button>

      {open && (
        <div ref={menuRef} className="tool-theme-menu" role="menu">
          {THEMES.map((t) => (
            <button
              key={t}
              type="button"
              role="menuitem"
              className={`tool-theme-item${t === theme ? " is-active" : ""}`}
              onClick={() => {
                setTheme(t);
                setOpen(false);
              }}
            >
              <span className="tool-theme-item-icon" aria-hidden="true">
                {t === "system" ? "🖥️" : t === "dark" ? "🌙" : "☀️"}
              </span>
              <span className="tool-theme-item-label">
                {t === "system" ? "System" : t === "dark" ? "Dark" : "Light"}
              </span>
              {t === theme && <span className="tool-theme-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}