"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useDownloadLimit } from './../../hooks/useDownloadLimit';
import './Navbar.css';

export default function Navbar() {
  // State to track which dropdown is open (null if none, or 1-5 for the button index)
  const [activeDropdown, setActiveDropdown] = useState(null);

  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State for transient toast messages (replaces alert() calls so the UI
  // never drops into the browser's native dialog).
  const [toast, setToast] = useState('');

  // Theme selector — custom dropdown with per-theme icons and persistence.
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || document.documentElement.getAttribute('data-theme') || 'light';
    }
    return 'light';
  };

  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(getInitialTheme);
  const themeDropdownRef = useRef(null);

  const themeOptions = [
    { value: 'light', label: 'Light', icon: '\u2600\ufe0F' },
    { value: 'dark', label: 'Dark', icon: '\uD83C\uDF19' },
    { value: 'neon', label: 'Neon', icon: '\u26A1' },
  ];

  // Sync the data-theme attribute on the root element whenever the chosen
  // theme changes. Runs on mount (idempotent) and on every subsequent change.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
  }, [selectedTheme]);

  // Close the theme dropdown when the user clicks outside of it.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        themeDropdownOpen &&
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(e.target)
      ) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [themeDropdownOpen]);

  // Daily download limit, shared across the app via the hook so every
  // component reads the same count and the same limit.
  const { remaining, limit, isBlocked } = useDownloadLimit();

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(''), 3600);
  };

  // Helper to check if a dropdown should be visible (either active on desktop or mobile menu is open)
  const shouldShowDropdown = (index) => {
    return activeDropdown === index || mobileMenuOpen;
  };

  // Toggle dropdown handler
  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Theme change handler — persists the choice on the document root, in
  // localStorage, and in React state, then closes the dropdown.
  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setThemeDropdownOpen(false);
  };

  const currentTheme = themeOptions.find((t) => t.value === selectedTheme) || themeOptions[0];

  const categories = [
    {
      name: 'Image Tools',
      tools: [
        { name: 'Background Remover', href: '/BGRemove' },
        { name: 'Favicon Generator', href: '/FavIcon' },
        { name: 'Image Resizer', href: '/ImageResizer' },
        { name: 'Image Compressor', href: '/ImgCompresser' },
        { name: 'Image to Base64', href: '/ImgToBase64' },
        { name: 'JPG to PNG', href: '/JpgToPng' },
        { name: 'PNG to JPG', href: '/PngToJpg' },
        { name: 'WebP to PNG', href: '/WebpToPng' },
        { name: 'Watermark', href: '/Watermark' },
      ],
    },
    {
      name: 'PDF Tools',
      tools: [],
    },
    {
      name: 'MS Office Tools',
      tools: [],
    },
    {
      name: 'Dev Tools',
      tools: [],
    },
    {
      name: 'Text Tools',
      tools: [],
    },
  ];

  const navLinks = (
    <>
      {categories.map((category, index) => (
        <li key={index} className="nav-dropdown-container">
          <button className="nav-button" onClick={() => handleDropdownToggle(index)}>
            {category.name} &#9662;
          </button>
          {shouldShowDropdown(index) && (
            <ul className="dropdown-menu">
              {category.tools.length > 0 ? (
                category.tools.map((tool, toolIndex) => (
                  <li key={toolIndex}>
                    <a href={tool.href}>{tool.name}</a>
                  </li>
                ))
              ) : (
                <li className="dropdown-under-build">Under Build</li>
              )}
            </ul>
          )}
        </li>
      ))}
    </>
  );

  const navActions = (
    <>
      {/* Daily Download Limit Indicator */}
      <div
        className={`download-limit-indicator${isBlocked ? ' is-limit-reached' : ''}`}
        title={isBlocked ? 'Daily download limit reached' : 'Downloads remaining today'}
      >
        Limit: <strong>
          {isBlocked ? `${limit} / ${limit}` : `${limit - remaining} / ${limit}`}
        </strong>
      </div>

      {/* Theme Selector (3 Options) — custom dropdown with icons */}
      <div
        className={`theme-selector${themeDropdownOpen ? ' open' : ''}`}
        ref={themeDropdownRef}
      >
        <button
          className="theme-selector-btn"
          onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
          aria-haspopup="listbox"
          aria-expanded={themeDropdownOpen}
          aria-label="Select theme"
        >
          <span className="theme-icon">{currentTheme.icon}</span>
          <span className="theme-label">{currentTheme.label}</span>
          <span className="theme-chevron" aria-hidden="true"></span>
        </button>

        {themeDropdownOpen && (
          <ul className="theme-dropdown-menu" role="listbox">
            {themeOptions.map((theme) => (
              <li key={theme.value}>
                <button
                  className={`theme-option${selectedTheme === theme.value ? ' active' : ''}`}
                  onClick={() => handleThemeChange(theme.value)}
                >
                  <span className="theme-option-icon">{theme.icon}</span>
                  <span>{theme.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pro Version Button */}
      <button
        className="pro-btn"
        onClick={() => showToast('Upgrade page coming soon.')}
      >
        <span className="pro-icon" aria-hidden="true"></span>
        <span>Get Pro</span>
      </button>
    </>
  );

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <a href="/">DocFix</a>
        </div>

        {/* Desktop Nav Links */}
        <ul className="navbar-links">
          {navLinks}
        </ul>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          {navActions}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
        >
          &#9776;
        </button>
      </nav>

      {/* Mobile Menu - single fixed container for reliability on Android */}
      <div
        className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        <aside className="drawer">
          <div className="drawer-header">
            <div className="navbar-logo">
              <a href="/">DocFix</a>
            </div>
            <button
              className="hamburger"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              &#10005;
            </button>
          </div>

          {/* Main 5 nav buttons first */}
          <ul className="navbar-links">
            {navLinks}
          </ul>

          {/* Then remaining: download limit, theme selector, pro button */}
          <div className="navbar-actions">
            {navActions}
          </div>
        </aside>
      </div>

      {/* Transient toast — replaces the old alert() so feedback stays in-app. */}
      {toast && (
        <div className="nav-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </>
  );
}