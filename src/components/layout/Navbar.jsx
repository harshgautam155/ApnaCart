import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import Input from "../../components/common/Input";
import { useAuth } from "../../hooks/useAuth";
import ShoppingCartIcon from "./ShoppingCartIcon";
import ProfileIcon from "./ProfileIcon";

export default function Navbar() {
  const ref = React.useRef(null);
  const { isAuthenticated } = useAuth();
  return (
    <nav className="flex items-center  justify-between px-6 py-5 shadow-sm">
      <Link to="/" className="text-3xl">
        <img src={logo} alt="apnaCart" className="h-8 w-auto" />
      </Link>
      <div className="flex gap-6 ml-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#EA580C] font-medium"
              : "text-gray-600 hover:text-[#EA580C]"
          }
        >
          Shop
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            isActive
              ? "text-[#EA580C] font-medium"
              : "text-gray-600 hover:text-[#EA580C]"
          }
        >
          Categories
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-[#EA580C] font-medium"
              : "text-gray-600 hover:text-[#EA580C]"
          }
        >
          Products
        </NavLink>
      </div>
      <div>
        <Input
          placeholder="Search Product"
          ref={ref}
          className="placeholder:text-[#88726B] w-100 active:border-[#FFDBCE] outline-none focus:ring-[#FFDBCE] focus:border-[#D85A30] h-10"
        />
      </div>
      {isAuthenticated ? (
        <div className="flex gap-6">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-[#EA580C] font-medium"
                : "text-gray-600 hover:text-[#EA580C]"
            }
          >
           <ShoppingCartIcon size={24} color="#EA580C" /> 
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-[#EA580C] font-medium"
                : "text-gray-600 hover:text-[#EA580C]"
            }
          >
           <ProfileIcon size={24} color="#EA580C" />
          </NavLink>
        </div>
      ) : (
        <div className="flex gap-6">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-[#EA580C] font-medium"
                : "text-gray-600 hover:text-[#EA580C]"
            }
          >
            login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "text-[#EA580C] font-medium"
                : "text-gray-600 hover:text-[#EA580C]"
            }
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </nav>
  );
}
