"use client";

import "./navbar.css";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";
import Logo from "../components/Logo";
import { useDownloadLimit } from "../hooks/useDownloadLimit";

const dropdownItems = {
  "Image Tools": [
    { href: "/BGRemove", title: "Background Remover", icon: "✂️" },
    { href: "/FavIcon", title: "Favicon Generator", icon: "🎯" },
    { href: "/ImageResizer", title: "Image Resizer", icon: "📐" },
    { href: "/ImgCompresser", title: "Image Compressor", icon: "🗜️" },
    { href: "/ImgToBase64", title: "Image to Base64", icon: "🔤" },
    { href: "/JpgToPng", title: "JPG to PNG", icon: "🔄" },
    { href: "/PngToJpg", title: "PNG to JPG", icon: "🔄" },
    { href: "/WebpToPng", title: "WebP to PNG", icon: "🔄" },
  ],
  "PDF Tools": [
    { href: "#", title: "PDF Merger", icon: "📄", disabled: true, comingSoon: true },
    { href: "#", title: "PDF Splitter", icon: "✂️", disabled: true, comingSoon: true },
    { href: "#", title: "PDF Compressor", icon: "🗜️", disabled: true, comingSoon: true },
    { href: "#", title: "Image to PDF", icon: "🖼️", disabled: true, comingSoon: true },
  ],
  "Dev Tools": [
    { href: "#", title: "JSON Formatter", icon: "{}", disabled: true, comingSoon: true },
    { href: "#", title: "Base64 Encoder", icon: "🔐", disabled: true, comingSoon: true },
    { href: "#", title: "Color Picker", icon: "🎨", disabled: true, comingSoon: true },
    { href: "#", title: "Regex Tester", icon: "🔍", disabled: true, comingSoon: true },
  ],
  "Utilities": [
    { href: "#", title: "QR Code Generator", icon: "📱", disabled: true, comingSoon: true },
    { href: "#", title: "Unit Converter", icon: "⚖️", disabled: true, comingSoon: true },
    { href: "#", title: "Password Generator", icon: "🔑", disabled: true, comingSoon: true },
    { href: "#", title: "Lorem Ipsum", icon: "📝", disabled: true, comingSoon: true },
  ],
};

const dropdownOrder = ["Image Tools", "PDF Tools", "Dev Tools", "Utilities"];

export default function Navbar({ pages }) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const { remaining, limit, isBlocked, consume } = useDownloadLimit();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState({ variant: "normal", label: "" });

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!openDropdown) return;
    function onClick(e) {
      const ref = dropdownRefs.current[openDropdown];
      if (ref?.contains(e.target)) return;
      setOpenDropdown(null);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpenDropdown(null);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openDropdown]);

  useEffect(() => {
    const getDownloadStatus = () => {
      if (remaining === 0) return { variant: "blocked", label: "Daily limit reached" };
      if (remaining <= 2) return { variant: "warning", label: `${remaining} / ${limit} downloads left` };
      return { variant: "normal", label: `${remaining} / ${limit} downloads left` };
    };
    setDownloadStatus(getDownloadStatus());
  }, [remaining, limit]);

  return (
    <header className={`tool-navbar${scrolled ? " is-scrolled" : ""}`}>
      <nav className="tool-nav" role="navigation" aria-label="Main navigation">
        <Link href="/" className="tool-nav-brand" aria-label="Go to homepage">
          <Logo className="h-8 w-auto" />
        </Link>

        <button
          type="button"
          className={`tool-nav-hamburger${menuOpen ? " is-open" : ""}`}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="tool-nav-hamburger-box">
            <span className="tool-nav-hamburger-inner"></span>
          </span>
        </button>

        {/* Mobile Drawer Overlay */}
        {menuOpen && (
          <div
            className="tool-nav-drawer-overlay"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Drawer Panel - slides from right */}
        <div
          className={`tool-nav-drawer${menuOpen ? " is-open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="tool-nav-drawer-header">
            <span className="tool-nav-drawer-title">Tools</span>
            <button
              type="button"
              className="tool-nav-drawer-close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <span className="tool-nav-close-icon" aria-hidden="true">✕</span>
            </button>
          </div>

          <div className="tool-nav-drawer-content">
            <div className="tool-nav-drawer-dropdowns">
              {dropdownOrder.map((dropdownTitle) => {
                const items = dropdownItems[dropdownTitle];
                const isOpen = openDropdown === dropdownTitle;
                return (
                  <div
                    key={dropdownTitle}
                    className="tool-nav-drawer-dropdown"
                    ref={(el) => { dropdownRefs.current[dropdownTitle] = el; }}
                  >
                    <button
                      type="button"
                      className={`tool-nav-drawer-dropdown-btn${isOpen ? " is-open" : ""}`}
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                      onClick={() => setOpenDropdown(isOpen ? null : dropdownTitle)}
                    >
                      {dropdownTitle}
                      <span className="tool-nav-drawer-dropdown-chevron" aria-hidden="true">▾</span>
                    </button>
                    {isOpen && (
                      <div className="tool-nav-drawer-dropdown-menu" role="menu">
                        {items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            className={`tool-nav-drawer-dropdown-item${item.disabled ? " is-disabled" : ""}`}
                            aria-disabled={item.disabled}
                            onClick={(e) => {
                              if (item.disabled) e.preventDefault();
                              else { setOpenDropdown(null); setMenuOpen(false); }
                            }}
                          >
                            <span className="tool-nav-drawer-dropdown-icon" aria-hidden="true">{item.icon}</span>
                            <span className="tool-nav-drawer-dropdown-label">{item.title}</span>
                            {item.comingSoon && (
                              <span className="tool-nav-drawer-dropdown-badge" aria-label="Coming soon">Soon</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="tool-nav-drawer-footer">
              <div className="tool-nav-drawer-theme">
                <ThemeToggle />
              </div>

              {/* Download status - only render after hydration to avoid mismatch */}
              {mounted && (
                <div className={`tool-nav-drawer-download-status ${downloadStatus.variant}`} role="status" aria-live="polite">
                  <span className="tool-nav-drawer-download-icon" aria-hidden="true">
                    {downloadStatus.variant === "blocked" && "🚫"}
                    {downloadStatus.variant === "warning" && "⚠️"}
                    {downloadStatus.variant === "normal" && "✓"}
                  </span>
                  <span className="tool-nav-drawer-download-label">{downloadStatus.label}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
