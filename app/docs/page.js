import ContentPage from "./../../components/ContentPage";

export const metadata = {
  title: "Documentation",
  description:
    "Guides and references for using DocFix image tools. Learn about batch processing, export formats, presets and more.",
};

export default function DocsPage() {
  return (
    <ContentPage
      title="Documentation"
      description="Guides, references and best practices for getting the most out of DocFix."
      eyebrow="Docs"
    >
      <div className="prose">
        <h2>Getting Started</h2>
        <p>
          DocFix works directly in your browser. No installation is required. Navigate to
          any tool from the home page or the navbar, drop in your file and start editing.
        </p>

        <h2>Batch Processing</h2>
        <p>
          Most tools support batch processing. Select multiple files at once, apply your
          settings and download all results as a ZIP archive. Batch limits depend on your
          plan.
        </p>

        <h2>Export Formats</h2>
        <p>
          Supported formats vary by tool but generally include PNG, JPG, WebP, ICO, SVG
          and ZIP. Each tool shows available export options in its settings panel.
        </p>

        <h2>Presets</h2>
        <p>
          Pro and Ultra plans let you save custom presets for repeated tasks. Presets
          include dimensions, quality settings, format choices and output filenames.
        </p>

        <h2>Keyboard Shortcuts</h2>
        <ul>
          <li><strong>Ctrl / Cmd + Z</strong> — Undo last action</li>
          <li><strong>Ctrl / Cmd + Y</strong> — Redo</li>
          <li><strong>Ctrl / Cmd + S</strong> — Export result</li>
          <li><strong>Ctrl / Cmd + ,</strong> — Open settings</li>
        </ul>

        <h2>Need Help?</h2>
        <p>
          Check the FAQ or reach out at hello@docfix.app. Paid subscribers receive
          priority support.
        </p>
      </div>
    </ContentPage>
  );
}
