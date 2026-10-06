"use client";
import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  // State to track which dropdown is open (null if none, or 1-5 for the button index)
  const [activeDropdown, setActiveDropdown] = useState(null);
   
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to check if a dropdown should be visible (either active on desktop or mobile menu is open)
  const shouldShowDropdown = (index) => {
    return activeDropdown === index || mobileMenuOpen;
  };

  // Toggle dropdown handler
  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Theme change handler stub
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    document.documentElement.setAttribute('data-theme', selectedTheme);
  };

  const navLinks = (
    <>
      {/* Button 1 */}
      <li className="nav-dropdown-container">
        <button className="nav-button" onClick={() => handleDropdownToggle(1)}>
          Products &#9662;
        </button>
        {shouldShowDropdown(1) && (
          <ul className="dropdown-menu">
            <li><a href="/item1">Analytics</a></li>
            <li><a href="/item2">Reporting</a></li>
            <li><a href="/item3">Automation</a></li>
          </ul>
        )}
      </li>

      {/* Button 2 */}
      <li className="nav-dropdown-container">
        <button className="nav-button" onClick={() => handleDropdownToggle(2)}>
          Solutions &#9662;
        </button>
        {shouldShowDropdown(2) && (
          <ul className="dropdown-menu">
            <li><a href="/item1">For Startups</a></li>
            <li><a href="/item2">Enterprise</a></li>
            <li><a href="/item3">Freelancers</a></li>
          </ul>
        )}
      </li>

      {/* Button 3 */}
      <li className="nav-dropdown-container">
        <button className="nav-button" onClick={() => handleDropdownToggle(3)}>
          Resources &#9662;
        </button>
        {shouldShowDropdown(3) && (
          <ul className="dropdown-menu">
            <li><a href="/item1">Documentation</a></li>
            <li><a href="/item2">API Reference</a></li>
            <li><a href="/item3">Community</a></li>
          </ul>
        )}
      </li>

      {/* Button 4 */}
      <li className="nav-dropdown-container">
        <button className="nav-button" onClick={() => handleDropdownToggle(4)}>
          Company &#9662;
        </button>
        {shouldShowDropdown(4) && (
          <ul className="dropdown-menu">
            <li><a href="/item1">About Us</a></li>
            <li><a href="/item2">Careers</a></li>
            <li><a href="/item3">Contact</a></li>
          </ul>
        )}
      </li>

      {/* Button 5 - Extra nav button */}
      <li className="nav-dropdown-container">
        <button className="nav-button" onClick={() => handleDropdownToggle(5)}>
          Pricing &#9662;
        </button>
        {shouldShowDropdown(5) && (
          <ul className="dropdown-menu">
            <li><a href="/item1">Basic</a></li>
            <li><a href="/item2">Pro</a></li>
            <li><a href="/item3">Enterprise</a></li>
          </ul>
        )}
      </li>
    </>
  );

  const navActions = (
    <>
      {/* Daily Download Limit Indicator */}
      <div className="download-limit-indicator" title="Downloads remaining today">
        Limit: <strong>8 / 10</strong>
      </div>

      {/* Theme Selector (3 Options) */}
      <div className="theme-selector">
        <select onChange={handleThemeChange} defaultValue="light" aria-label="Theme Selector">
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
          <option value="neon">Neon Theme</option>
        </select>
      </div>

      {/* Pro Version Button */}
      <button className="pro-btn" onClick={() => alert('Redirecting to upgrade page...')}>
        Get Pro
      </button>
    </>
  );

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <a href="/">Loge</a>
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
              <a href="/">Loge</a>
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
    </>
  );
}