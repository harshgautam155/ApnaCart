import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import CartItem from "./CartItem";
import formatRupees from "../../utils/formateRupees";
function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    items,
    itemPrice,
    tax,
    shipping,
    total,
    removeItem,
    updateQty,
  } = useCart();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          Your cart is empty
        </h1>
        <Link
          to="/products"
          className="inline-block mt-4 px-6 py-3 rounded font-semibold"
          style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        Your Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          {items.map((item) => (
            <CartItem
              key={item.product}
              item={item}
              onRemove={() => removeItem(item.product)}
              onQtyChange={(qty) => updateQty(item.product, qty)}
            />
          ))}
        </div>

        <div className="border border-[#1B2340]/10 rounded-lg p-6 h-fit bg-white/60">
          <h2 className="font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="opacity-70">Items</span>
              <span>{formatRupees(itemPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Tax</span>
              <span>{formatRupees(tax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Shipping</span>
              <span>{shipping === 0 ? "Free" : `${formatRupees(shipping)}`}</span>
            </div>
          </div>

          <div className="flex justify-between font-semibold text-lg border-t border-[#1B2340]/10 pt-4 mb-6">
            <span>Total</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {formatRupees(total)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 rounded font-semibold"
            style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;