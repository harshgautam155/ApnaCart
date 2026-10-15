import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../orders/orderSlice";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

function AdminOrderList() {
  const dispatch = useDispatch();
  const { allOrders, allOrdersStatus, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (allOrdersStatus === "loading") return <Loader />;
  if (allOrdersStatus === "failed") return <ErrorMessage message={error} />;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        All Orders
      </h1>

      {allOrders.length === 0 ? (
        <p className="opacity-60 text-center py-20">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1B2340]/10 text-left opacity-60">
                <th className="py-3 pr-4 font-medium">Order ID</th>
                <th className="py-3 pr-4 font-medium">Date</th>
                <th className="py-3 pr-4 font-medium">Total</th>
                <th className="py-3 pr-4 font-medium">Paid</th>
                <th className="py-3 pr-4 font-medium">Delivered</th>
                <th className="py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <tr key={order._id} className="border-b border-[#1B2340]/10">
                  <td className="py-3 pr-4 font-mono text-xs">{order._id}</td>
                  <td className="py-3 pr-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    className="py-3 pr-4 font-semibold"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    ₹{order.totalPrice?.toFixed(2)}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: order.isPaid ? "#4C7A5E" : "#D85A30",
                        color: "#FDF1EC",
                      }}
                    >
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: order.isDelivered ? "#4C7A5E" : "#E8A33D",
                        color: order.isDelivered ? "#FDF1EC" : "#412402",
                      }}
                    >
                      {order.isDelivered ? "Delivered" : "Processing"}
                    </span>
                  </td>
                  <td className="py-3">
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-sm font-medium hover:underline"
                      style={{ color: "#D85A30" }}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrderList;