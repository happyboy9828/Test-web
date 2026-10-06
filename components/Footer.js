import Link from "next/link";
import Logo from "./Logo";
import { getPages } from "../lib/pages";

// A compact, trustworthy footer: brand, a short trust line, tool links and a
// status note. It stays inside the shared shell width so it lines up with the
// navbar and the tool container. No heavy markup, no chrome — just enough to
// anchor the page and signal that the site is maintained.
export default function Footer() {
  const year = new Date().getFullYear();
  // Reuse the same page discovery as the home page and the navbar so the
  // footer's tool list can never drift out of sync with the routes.
  const pages = getPages();

  return (
    <footer className="tool-footer" role="contentinfo">
      <div className="tool-footer-inner">
        <div className="tool-footer-brand">
           <Link href="/" className="tool-footer-logo">
             <Logo className="h-7 w-auto" />
           </Link>
          <p className="tool-footer-tag">
            Browser-only image tools. No uploads leave your device.
          </p>
        </div>

        <nav className="tool-footer-links" aria-label="Tools">
          <Link href="/" className="tool-footer-link">
            Home
          </Link>
          {pages.map((page) => (
            <Link key={page.href} href={page.href} className="tool-footer-link">
              {page.title}
            </Link>
          ))}
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