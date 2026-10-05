import Link from "next/link";
import Logo from "./Logo";

// A compact, trustworthy footer: brand, a short trust line, tool links and a
// status note. It stays inside the shared shell width so it lines up with the
// navbar and the tool container. No heavy markup, no chrome — just enough to
// anchor the page and signal that the site is maintained.
export default function Footer() {
  const year = new Date().getFullYear();

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
          <Link href="/ImageResizer" className="tool-footer-link">
            Resize
          </Link>
          <Link href="/ImgCompresser" className="tool-footer-link">
            Compress
          </Link>
          <Link href="/BGRemove" className="tool-footer-link">
            Remove BG
          </Link>
          <Link href="/WebpToPng" className="tool-footer-link">
            WebP to PNG
          </Link>
          <Link href="/PngToJpg" className="tool-footer-link">
            PNG to JPG
          </Link>
          <Link href="/JpgToPng" className="tool-footer-link">
            JPG to PNG
          </Link>
          <Link href="/ImgToBase64" className="tool-footer-link">
            Image to Base64
          </Link>
          <Link href="/FavIcon" className="tool-footer-link">
            Favicon
          </Link>
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