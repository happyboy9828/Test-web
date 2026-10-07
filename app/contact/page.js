import ContentPage from "./../../components/ContentPage";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with the DocFix team. We are here to help with questions, feedback and support.",
};

export default function ContactPage() {
  return (
    <ContentPage
      title="Contact Us"
      description="Have a question, idea or issue? We would love to hear from you."
      eyebrow="Contact"
    >
      <div className="prose">
        <h2>Email</h2>
        <p>
          <a href="mailto:hello@docfix.app">hello@docfix.app</a>
        </p>

        <h2>Support</h2>
        <p>
          For account and billing questions, please include your subscription email so we
          can look up your account quickly.
        </p>

        <h2>Feedback</h2>
        <p>
          Feature requests, bug reports and general feedback are all welcome. The fastest
          way to reach us is by email, but you can also find us on GitHub.
        </p>

        <h2>Response Time</h2>
        <p>
          We aim to reply within 24 hours on weekdays. Paid subscribers receive priority
          support.
        </p>
      </div>
    </ContentPage>
  );
}
