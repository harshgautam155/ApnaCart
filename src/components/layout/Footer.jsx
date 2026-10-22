import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1B2340] text-[#FDF1EC]/70 px-6 py-10 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-[#FDF1EC] font-semibold text-sm mb-3">Shop</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/products" className="hover:text-[#FDF1EC]">
              All Products
            </Link>
            <Link
              to="/products?category=Electronics"
              className="hover:text-[#FDF1EC]"
            >
              Electronics
            </Link>
            <Link
              to="/products?category=Fashion"
              className="hover:text-[#FDF1EC]"
            >
              Fashion
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <h3 className="text-[#FDF1EC] font-semibold text-sm">Categories</h3>
          <Link to="/products?category=Beauty" className="hover:text-[#FDF1EC]">
            Beauty
          </Link>
          <Link to="/products?category=Books" className="hover:text-[#FDF1EC]">
            Books
          </Link>
          <Link to="/products?category=Sports" className="hover:text-[#FDF1EC]">
            Sports
          </Link>
          <Link
            to="/products?category=Home&Living"
            className="hover:text-[#FDF1EC]"
          >
            Home & living
          </Link>
        </div>

        <div>
          <h3 className="text-[#FDF1EC] font-semibold text-sm mb-3">Account</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/profile" className="hover:text-[#FDF1EC]">
              My Profile
            </Link>
            <Link to="/orders" className="hover:text-[#FDF1EC]">
              My Orders
            </Link>
            <Link to="/cart" className="hover:text-[#FDF1EC]">
              Cart
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-[#FDF1EC] font-semibold text-sm mb-3">Support</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/contact" className="hover:text-[#FDF1EC]">
              Contact
            </Link>
            <Link to="/about" className="hover:text-[#FDF1EC]">
              About
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-[#FDF1EC] font-semibold text-sm mb-3">Legal</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/privacy" className="hover:text-[#FDF1EC]">
              Privacy Policy
            </Link>
            <Link to="/returns" className="hover:text-[#FDF1EC]">
              Returns & Refunds
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-[#FDF1EC]/10 pt-6 flex flex-col md:flex-row justify-between gap-2 text-sm">
        <p>&copy; {new Date().getFullYear()} apnaCart. All rights reserved.</p>
        <p className="opacity-60">Cash on Delivery · Card · UPI</p>
      </div>
    </footer>
  );
}
