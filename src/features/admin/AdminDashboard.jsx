import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          axiosInstance.get("products/admin/all"),
          axiosInstance.get("orders/admin/all"),
        ]);

        setProducts(productsRes.data.products || productsRes.data.data || productsRes.data);
        setOrders(ordersRes.data.orders || ordersRes.data.data || ordersRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
  const outOfStockCount = products.filter((p) => p.countInStock === 0).length;
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const stats = [
    { label: "Total Products", value: products.length },
    { label: "Total Orders", value: orders.length },
    { label: "Revenue", value: `₹${totalRevenue.toFixed(2)}` },
    { label: "Out of Stock", value: outOfStockCount },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        Admin Dashboard
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-[#1B2340]/10 rounded-lg p-5 bg-white/60"
          >
            <p className="text-xs uppercase tracking-wide opacity-50 mb-1">
              {stat.label}
            </p>
            <p
              className="text-2xl font-semibold"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Link
          to="/products/admin/create"
          className="text-center py-3 rounded font-medium"
          style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
        >
          + New Product
        </Link>
        <Link
          to="/admin/products"
          className="text-center py-3 rounded font-medium border border-[#1B2340]/20"
        >
          Manage Products
        </Link>
        <Link
          to="/admin/orders"
          className="text-center py-3 rounded font-medium border border-[#1B2340]/20"
        >
          Manage Orders
        </Link>
        <Link
          to="/admin/users"
          className="text-center py-3 rounded font-medium border border-[#1B2340]/20"
        >
          Manage Users
        </Link>
      </div>

      {/* Recent orders */}
      <div>
        <h2 className="font-semibold mb-4">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="opacity-60 text-sm">No orders yet.</p>
        ) : (
          <div className="space-y-2">
            {recentOrders.map((order) => (
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
                    className="font-semibold text-sm"
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
    </div>
  );
}

export default AdminDashboard;