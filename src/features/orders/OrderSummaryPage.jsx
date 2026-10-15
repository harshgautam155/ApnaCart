import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "./orderSlice";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

function OrderSummaryPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, orderStatus, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (orderStatus === "loading") return <Loader />;
  if (orderStatus === "failed") return <ErrorMessage message={error} />;
  if (!order) return null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div
        className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl"
        style={{ backgroundColor: "#4C7A5E", color: "#FDF1EC" }}
      >
        ✓
      </div>

      <h1 className="text-4xl mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        Order confirmed
      </h1>
      <p className="opacity-70 mb-10">
        Thanks — your order has been placed. A confirmation will be sent
        shortly.
      </p>

      <div className="border border-[#1B2340]/10 rounded-lg p-6 text-left bg-white/60 mb-8">
        <div className="flex justify-between text-sm mb-4">
          <span className="opacity-60">Order ID</span>
          <span className="font-medium">{order._id}</span>
        </div>

        <div className="space-y-2 mb-4">
          {order.orderItems.map((item) => (
            <div key={item.product} className="flex justify-between text-sm">
              <span className="opacity-70">
                {item.name} × {item.qty}
              </span>
              <span>₹{(item.qty * item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-semibold text-lg border-t border-[#1B2340]/10 pt-4">
          <span>Total paid</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            ₹{order.totalPrice?.toFixed(2)}
          </span>
        </div>

        <p className="text-xs opacity-60 mt-4">
          Shipping to: {order.shippingAddress.address},{" "}
          {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
          {order.shippingAddress.postalCode}
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <Link
          to={`/orders/${order._id}`}
          className="px-6 py-3 rounded font-semibold border border-[#1B2340]/20"
        >
          Track this order
        </Link>
        <Link
          to="/products"
          className="px-6 py-3 rounded font-semibold"
          style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSummaryPage;
