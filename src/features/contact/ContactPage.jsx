import { Link } from "react-router-dom";

function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <p
        className="text-sm tracking-[0.3em] uppercase mb-4"
        style={{ color: "#D85A30", fontFamily: "'JetBrains Mono', monospace" }}
      >
        Get in touch
      </p>

      <h1
        className="text-5xl mb-6"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Contact us
      </h1>

      <p className="opacity-70 mb-8">
        Questions, feedback, or something not working right? Reach out —
        we'll get back to you within a day or two.
      </p>

      <a
        href="mailto:support@apnacart.com"
        className="inline-block px-6 py-3 rounded font-semibold"
        style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
      >
        support@apnacart.com
      </a>
    </div>
  );
}

export default ContactPage;