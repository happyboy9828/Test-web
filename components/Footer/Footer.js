import Link from "next/link";
import Logo from "../Logo/Logo";
import { getCategories } from "../../lib/pages";

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

        <details className="tool-footer-accordion">
          <summary className="tool-footer-accordion-head">
            <h2 className="tool-footer-heading">Navigation</h2>
            <span className="tool-footer-chevron" aria-hidden="true">
              ▾
            </span>
          </summary>
          <ul className="tool-footer-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="tool-footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>

        <details className="tool-footer-accordion">
          <summary className="tool-footer-accordion-head">
            <h2 className="tool-footer-heading">Popular Category</h2>
            <span className="tool-footer-chevron" aria-hidden="true">
              ▾
            </span>
          </summary>
          <ul className="tool-footer-list tool-footer-categories">
            {categories.map((category) => (
              <li key={category.name} className="tool-footer-category-name">
                {category.name}
              </li>
            ))}
          </ul>
        </details>

        <details className="tool-footer-accordion">
          <summary className="tool-footer-accordion-head">
            <h2 className="tool-footer-heading">Legal & Support</h2>
            <span className="tool-footer-chevron" aria-hidden="true">
              ▾
            </span>
          </summary>
          <ul className="tool-footer-list">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="tool-footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
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