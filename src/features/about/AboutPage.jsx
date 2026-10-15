import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <p
        className="text-sm tracking-[0.3em] uppercase mb-4"
        style={{ color: "#D85A30", fontFamily: "'JetBrains Mono', monospace" }}
      >
        About apnaCart
      </p>

      <h1
        className="text-5xl mb-8"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Your market, online.
      </h1>

      <div className="space-y-5 text-sm leading-relaxed opacity-80">
        <p>
          apnaCart brings the everyday market online — electronics, fashion,
          home goods, and everything in between, in one cart, at real
          prices.
        </p>
        <p>
          "Apna" means "our own" — the idea is simple: shopping that feels
          local and straightforward, without middlemen markups or confusing
          pricing.
        </p>
        <p>
          Cash on delivery, easy 7-day returns, and secure checkout come
          standard — no fine print.
        </p>
      </div>

      <Link
        to="/products"
        className="inline-block mt-10 px-6 py-3 rounded font-semibold"
        style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
      >
        Browse products
      </Link>
    </div>
  );
}

export default AboutPage;