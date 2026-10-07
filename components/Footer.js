import Link from "next/link";
import Logo from "./Logo";
import { getCategories } from "../lib/pages";

// A structured footer in four columns: the brand with its trust line,
// the main navigation, the popular tool categories and the legal links,
// with a thin copyright strip along the bottom. It stays inside the
// shared shell width so it lines up with the navbar and the tool
// container, and every colour comes from the shared tokens so it
// tracks the active theme.

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/faq", label: "FAQ" },
  { href: "/docs", label: "Docs" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  // Reuse the same category map the navbar dropdowns are built from
  // so the footer's category list can never drift out of sync.
  const categories = getCategories();

  return (
    <footer className="tool-footer" role="contentinfo">
      <div className="tool-footer-inner">
        <div className="tool-footer-brand">
          <Link href="/" className="tool-footer-logo" aria-label="DocFix — home">
            <Logo className="tool-footer-logo-mark" />
          </Link>
          <p className="tool-footer-tag">
            Browser-only image tools. No uploads leave your device.
          </p>
        </div>

        <nav className="tool-footer-col" aria-label="Navigation">
          <h2 className="tool-footer-heading">Navigation</h2>
          <ul className="tool-footer-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="tool-footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="tool-footer-col" aria-label="Popular categories">
          <h2 className="tool-footer-heading">Popular Category</h2>
          <ul className="tool-footer-list tool-footer-categories">
            {categories.map((category) => (
              <li key={category.name} className="tool-footer-category-name">
                {category.name}
              </li>
            ))}
          </ul>
        </nav>

        <nav className="tool-footer-col" aria-label="Legal & Support">
          <h2 className="tool-footer-heading">Legal &amp; Support</h2>
          <ul className="tool-footer-list">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="tool-footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="tool-footer-meta">
        <span>© {year} DocFix</span>
        <span className="tool-footer-sep" aria-hidden="true">
          •
        </span>
        <span>All processing happens locally in your browser.</span>
      </div>
    </footer>
  );
}
