import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "./orderSlice";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

function MyOrdersPage() {
  const dispatch = useDispatch();
  const { myOrders, myOrdersStatus, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (myOrdersStatus === "loading") return <Loader />;
  if (myOrdersStatus === "failed") return <ErrorMessage message={error} />;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        My Orders
      </h1>

      {myOrders.length === 0 ? (
        <div className="text-center py-20">
          <p className="opacity-60 mb-4">You haven't placed any orders yet.</p>
          <Link
            to="/products"
            className="inline-block px-6 py-3 rounded font-semibold"
            style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {myOrders.map((order) => (
            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="flex items-center justify-between border border-[#1B2340]/10 rounded-lg p-4 bg-white/60 hover:border-[#D85A30] transition-colors"
            >
              <div>
                <p className="font-medium text-sm">Order #{order._id}</p>
                <p className="text-xs opacity-60">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p
                  className="font-semibold"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  ₹{order.totalPrice?.toFixed(2)}
                </p>
                <p className="text-xs opacity-60">
                  {order.isDelivered ? "Delivered" : "Processing"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrdersPage;