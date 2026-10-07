import ContentPage from "./../../components/ContentPage";

export const metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about DocFix image tools. Learn about privacy, pricing, file limits and browser support.",
};

const faqs = [
  {
    q: "Are my images uploaded to a server?",
    a: "No. Every tool runs entirely in your browser using client-side APIs. Your files never leave your device.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account is required to use any of the free tools. Paid subscriptions are handled securely through our payment provider.",
  },
  {
    q: "Which browsers are supported?",
    a: "DocFix works in all modern browsers that support WebAssembly and the File API, including Chrome, Firefox, Safari and Edge.",
  },
  {
    q: "Is there a file size limit?",
    a: "Free plans are limited by available browser memory. Paid plans raise the practical limit with batch processing and optimized pipelines.",
  },
  {
    q: "Can I use DocFix on mobile?",
    a: "Yes. All tools are responsive and work on mobile browsers. Some features are optimized for larger screens, but the core functionality is fully available on mobile.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "You can cancel anytime from your account settings. There are no cancellation fees and your access continues until the end of your billing period.",
  },
  {
    q: "Are batch downloads supported?",
    a: "Yes. Pro and Ultra plans include batch ZIP download so you can process multiple files at once and download them as a single archive.",
  },
  {
    q: "Is DocFix open source?",
    a: "We are exploring open-sourcing parts of our tooling. Follow our blog for updates.",
  },
];

export default function FAQPage() {
  return (
    <ContentPage
      title="Frequently Asked Questions"
      description="Everything you need to know about DocFix, from privacy to pricing."
      eyebrow="FAQ"
    >
      <div className="faq-list">
        {faqs.map(({ q, a }, i) => (
          <details key={i} className="faq-item">
            <summary className="faq-q">{q}</summary>
            <p className="faq-a">{a}</p>
          </details>
        ))}
      </div>
    </ContentPage>
  );
}
