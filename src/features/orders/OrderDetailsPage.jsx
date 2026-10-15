import { useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "./orderSlice";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

function OrderDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { order, orderStatus, error } = useSelector((state) => state.orders);

  const justPlaced = location.state?.justPlaced; // set by CheckoutPage's navigate()

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (orderStatus === "loading") return <Loader />;
  if (orderStatus === "failed") return <ErrorMessage message={error} />;
  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {justPlaced && (
        <div
          className="rounded-lg px-6 py-4 mb-8"
          style={{ backgroundColor: "#4C7A5E", color: "#FDF1EC" }}
        >
          Order placed successfully! Here are your order details.
        </div>
      )}

      <h1 className="text-3xl mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        Order #{order._id}
      </h1>
      <p className="text-sm opacity-60 mb-8">
        Placed on {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="font-semibold mb-2">Shipping Address</h2>
            <p className="text-sm opacity-70">
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.state} {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            <p className="text-sm mt-2">
              Status:{" "}
              <span className="font-medium">
                {order.isDelivered ? "Delivered" : "Not yet delivered"}
              </span>
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Payment Method</h2>
            <p className="text-sm opacity-70">{order.paymentMethod}</p>
            <p className="text-sm mt-2">
              Status:{" "}
              <span className="font-medium">
                {order.isPaid ? "Paid" : "Not yet paid"}
              </span>
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-4">Items</h2>
            <div className="space-y-3">
              {order.orderItems.map((item) => (
                <div key={item.product} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <Link
                    to={`/products/${item.product}`}
                    className="flex-1 text-sm hover:underline"
                  >
                    {item.name}
                  </Link>
                  <span className="text-sm opacity-70">
                    {item.qty} × ₹{item.price}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    ₹{(item.qty * item.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-[#1B2340]/10 rounded-lg p-6 h-fit bg-white/60">
          <h2 className="font-semibold mb-4">Order Total</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="opacity-70">Items</span>
              <span>₹{order.itemsPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Tax</span>
              <span>₹{order.taxPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Shipping</span>
              <span>₹{order.shippingPrice?.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-[#1B2340]/10 pt-4 mt-4">
            <span>Total</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              ₹{order.totalPrice?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;