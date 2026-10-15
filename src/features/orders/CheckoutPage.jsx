import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";
import { placeOrder, clearCurrentOrder } from "./orderSlice";
import { clearCart } from "../cart/cartSlice";
import formatRupees from "../../utils/formateRupees";

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, itemPrice, tax, shipping, total } = useCart();
  const { placeStatus, error } = useSelector((state) => state.orders);

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleAddressChange = (e) => {
    setShippingAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderItems = items.map((item) => ({
      product: item.product,
      qty: item.qty,
    }));

    const result = await dispatch(
      placeOrder({ orderItems, shippingAddress, paymentMethod }),
    );

    if (placeOrder.fulfilled.match(result)) {
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      const orderId = result.payload.order?._id || result.payload._id;
      navigate(`/orders/${orderId}`);
      dispatch(clearCurrentOrder());
    } else {
      toast.error(result.payload || "Failed to place order");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="opacity-60">Your cart is empty — nothing to check out.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        Checkout
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
          <div>
            <h2 className="font-semibold mb-3">Shipping Address</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingAddress.address}
                onChange={handleAddressChange}
                required
                className="w-full border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  required
                  className="border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={shippingAddress.state}
                  onChange={handleAddressChange}
                  required
                  className="border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={shippingAddress.postalCode}
                  onChange={handleAddressChange}
                  required
                  className="border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
                />
                <input
                  type="text"
                  name="landmark"
                  placeholder="Landmark"
                  value={shippingAddress.landmark}
                  onChange={handleAddressChange}
                  required
                  className="border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Payment Method</h2>
            <div className="space-y-2">
              {[
                { value: "COD", label: "Cash on Delivery" },
                { value: "Card", label: "Card" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 border border-[#1B2340]/20 rounded px-3 py-2 bg-white cursor-pointer"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.value}
                    checked={paymentMethod === option.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={placeStatus === "loading"}
            className="w-full py-3 rounded font-semibold disabled:opacity-50"
            style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
          >
            {placeStatus === "loading" ? "Placing order..." : "Place Order"}
          </button>
        </form>

        <div className="border border-[#1B2340]/10 rounded-lg p-6 h-fit bg-white/60">
          <h2 className="font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm mb-4 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.product} className="flex justify-between">
                <span className="opacity-70">
                  {item.name} × {item.qty}
                </span>
                <span>{formatRupees(item.price * item.qty)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm border-t border-[#1B2340]/10 pt-4 mb-4">
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
              <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
            </div>
          </div>

          <div className="flex justify-between font-semibold text-lg border-t border-[#1B2340]/10 pt-4">
            <span>Total</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {formatRupees(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;