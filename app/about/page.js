import ContentPage from "./../../components/ContentPage";

export const metadata = {
  title: "About",
  description:
    "DocFix is a suite of browser-only image tools built for speed, privacy and simplicity. No uploads, no sign-up, no installation required.",
};

export default function AboutPage() {
  return (
    <ContentPage
      title="About DocFix"
      description="We built DocFix because image editing on the web should be fast, private and accessible to everyone."
      eyebrow="About"
    >
      <div className="prose">
        <h2>Our Mission</h2>
        <p>
          DocFix is a collection of small, focused browser-only image tools. Every action runs
          locally inside your tab — your files never leave your device. That means faster
          processing, complete privacy and zero bandwidth costs.
        </p>

        <h2>What We Believe</h2>
        <ul>
          <li><strong>Privacy first.</strong> No server uploads, no tracking pixels, no accounts required.</li>
          <li><strong>Simplicity over features.</strong> Each tool does one thing well, with a clean interface.</li>
          <li><strong>Speed matters.</strong> We use modern browser APIs to process images in milliseconds.</li>
          <li><strong>Accessible everywhere.</strong> If you have a browser, you have DocFix.</li>
        </ul>

        <h2>The Team</h2>
        <p>
          DocFix is built and maintained by a small, independent team. We iterate fast, ship
          often and listen to feedback. If you find a bug or have an idea, we want to hear it.
        </p>

        <h2>Contact</h2>
        <p>
          Reach us at <a href="mailto:hello@docfix.app">hello@docfix.app</a>. We read every
          message.
        </p>
      </div>
    </ContentPage>
  );
}
