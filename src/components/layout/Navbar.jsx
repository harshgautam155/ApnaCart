import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";
import { LuShoppingCart, LuUser } from "react-icons/lu";

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
            `transition-all duration-300 ease-out
            hover:text-[#EA580C]
            hover:-translate-y-1
            active:translate-y-0
            ${isActive ? "text-[#EA580C] font-medium" : "text-gray-600"}`
          }
        >
          Shop
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `transition-all duration-300 ease-out
              hover:text-[#EA580C]
              hover:-translate-y-1
              active:translate-y-0
              ${isActive ? "text-[#EA580C] font-medium" : "text-gray-600"}`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `transition-all duration-300 ease-out
            hover:text-[#EA580C]
            hover:-translate-y-1
            active:translate-y-0
            ${isActive ? "text-[#EA580C] font-medium" : "text-gray-600"}`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `transition-all duration-300 ease-out
            hover:text-[#EA580C]
            hover:-translate-y-1
            active:translate-y-0
            ${isActive ? "text-[#EA580C] font-medium" : "text-gray-600"}`
          }
        >
          Contact
        </NavLink>
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
            <LuShoppingCart size={24} />
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-[#EA580C] font-medium"
                : "text-gray-600 hover:text-[#EA580C]"
            }
          >
            <LuUser size={24} />
          </NavLink>
        </div>
      ) : (
        <div className="flex gap-6">
          <NavLink
            to="/login"
            className={` 
                bg-white/50
                px-4 py-2
                rounded
                whitespace-nowrap
                font-semibold
                text-gray-600

                transition-all duration-300 ease-out
                hover:text-[#EA580C]
                hover:-translate-y-1
                hover:shadow-md
                hover:bg-[#EA580C]/5
                active:translate-y-0
              `}
          >
            login
          </NavLink>
          <NavLink
            to="/register"
            className={` 
                  bg-white/50
                  px-4 py-2
                  rounded
                  whitespace-nowrap
                  font-semibold
                  text-gray-600

                  transition-all duration-300 ease-out
                  hover:text-[#EA580C]
                  hover:-translate-y-1
                  hover:shadow-md
                  hover:bg-[#EA580C]/5
                  active:translate-y-0`}
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </nav>
  );
}
