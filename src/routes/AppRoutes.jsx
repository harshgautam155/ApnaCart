import { Routes, Route } from "react-router-dom";
import App from "../App";
import {
  LoginPage,
  RegisterPage,
  VerifyOtpPage,
  LandingPage,
} from "../features";
import PrivateRoute from "../components/common/PrivateRoutes";
import AdminRoute from "../components/common/AdminRoutes";
import ProfilePage from "../features/auth/ProfilePage";

import ProductListPage from "../features/products/ProductListPage";
import ProductDetailsPage from "../features/products/ProductDetailsPage";

import CartPage from "../features/cart/CartPage";

import CheckoutPage from "../features/orders/CheckoutPage";
import MyOrdersPage from "../features/orders/MyOrderPage";
import OrderDetailsPage from "../features/orders/OrderDetailsPage";

import AdminDashboard from "../features/admin/AdminDashboard";
import AdminProductForm from "../features/admin/AdminProductForm";
import AdminOrderList from "../features/admin/AdminOrderList";
import AdminUserList from "../features/admin/AdminUserList";

import AboutPage from "../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        {/* ---------- Public routes ---------- */}
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="verify" element={<VerifyOtpPage />} />

        <Route path="products" element={<ProductListPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />

        <Route path="cart" element={<CartPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        {/* ---------- Private routes (logged-in users only) ---------- */}
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />

        <Route
          path="orders"
          element={
            <PrivateRoute>
              <MyOrdersPage />
            </PrivateRoute>
          }
        />

        <Route
          path="orders/:id"
          element={
            <PrivateRoute>
              <OrderDetailsPage />
            </PrivateRoute>
          }
        />
        {/* ---------- Admin routes (admins only) ---------- */}
        <Route
          path="admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="products/admin/create"
          element={
            <AdminRoute>
              <AdminProductForm />
            </AdminRoute>
          }
        />
        <Route
          path="admin/products/edit/:id"
          element={
            <AdminRoute>
              <AdminProductForm />
            </AdminRoute>
          }
        />

        <Route
          path="admin/orders"
          element={
            <AdminRoute>
              <AdminOrderList />
            </AdminRoute>
          }
        />

        <Route
          path="admin/users"
          element={
            <AdminRoute>
              <AdminUserList />
            </AdminRoute>
          }
        />

        {/* ---------- 404 ---------- */}
        <Route
          path="*"
          element={
            <div className="flex justify-center align-middle text-4xl text-center p-20">
              404 — Page not found
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
