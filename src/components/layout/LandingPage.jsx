import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import bg from "../../assets/landing-bg.png";
const categories = [
  { name: "Electronics", emoji: "🔌" },
  { name: "Fashion", emoji: "👕" },
  { name: "Home & Living", emoji: "🏠" },
  { name: "Beauty", emoji: "💄" },
  { name: "Sports", emoji: "🏏" },
  { name: "Books", emoji: "📚" },
];

function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div style={{ backgroundColor: "#FDF1EC" }} className="text-[#1B2340]">
      {/* ---------- HERO ---------- */}
      <section style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${bg})` }} className="bg-cover bg-center bg-no-repeat relative overflow-hidden px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="relative max-w-3xl mx-auto text-center">
          <p
            className="text-sm tracking-[0.3em] uppercase mb-4 font-medium"
            style={{
              color: "#D85A30",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Your market, online
          </p>

          <h1
            className="text-6xl md:text-8xl leading-[0.95] mb-6"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            SHOP APNA.
            <br />
            <span style={{ color: "#D85A30" }}>SHOP SMART.</span>
          </h1>

          <p className="text-lg opacity-70 mb-10 max-w-xl mx-auto">
            Everything from your daily needs to your next big splurge — one
            cart, real prices, no middlemen markup.
          </p>

          {/* Signature element: die-cut price-tag CTA */}
          <Link
            to={isAuthenticated ? "/products" : "/login"}
            className="inline-flex items-center gap-3 relative pl-6 pr-8 py-4 font-semibold text-lg transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: "#D85A30",
              color: "#FDF1EC",
              clipPath:
                "polygon(0% 0%, calc(100% - 24px) 0%, 100% 50%, calc(100% - 24px) 100%, 0% 100%)",
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "#FDF1EC" }}
            />
            Start Shopping
          </Link>
        </div>
      </section>

      {/* ---------- TRUST STRIP ---------- */}
      <section className="border-y border-[#1B2340]/10 py-6 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Free shipping", detail: "On orders over ₹500" },
            { label: "Cash on delivery", detail: "Pay when it arrives" },
            { label: "Easy returns", detail: "7-day return window" },
            { label: "Secure checkout", detail: "Your data stays yours" },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-semibold text-sm mb-1">{item.label}</p>
              <p className="text-xs opacity-60">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CATEGORY STALLS ---------- */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2
          className="text-4xl mb-10 text-center"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Browse the market
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group p-6 rounded-lg border border-[#1B2340]/10 bg-white/50 transition-colors hover:border-[#D85A30]"
            >
              <span className="text-3xl mb-3 block">{cat.emoji}</span>
              <span className="font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- FEATURED DEAL BANNER (dark navy, echoes your footer) ---------- */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div
          className="rounded-lg p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ backgroundColor: "#1B2340", color: "#FDF1EC" }}
        >
          <div>
            <p
              className="text-sm mb-2"
              style={{
                color: "#E8A33D",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              LIMITED TIME
            </p>
            <h3
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              First order? Save 15%.
            </h3>
          </div>
          {isAuthenticated ? (
            <Link
              to="/register"
              className="px-8 py-4 rounded font-semibold whitespace-nowrap"
              style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
            >
              View Products
            </Link>
          ) : (
            <Link
              to="/register"
              className="px-8 py-4 rounded font-semibold whitespace-nowrap"
              style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
            >
              Create account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
