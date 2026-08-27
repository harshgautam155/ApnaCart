import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

function RegisterPage() {
  const navigate = useNavigate();
  const { loading, error, dispatch } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(formData));

    if (register.fulfilled.match(result)) {
      toast.success("OTP sent to your email!");
      navigate("/verify", { state: { email: formData.email } });
    } else {
      toast.error(result.payload || "Registration failed");
    }
  };
return (
    /* 1. Full-screen blurred backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/40 backdrop-blur-md">
      <div className="relative z-10 w-full max-w-md p-8 bg-white border border-gray-100 rounded-xl shadow-2xl">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Create an Account</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D85A30]/50 focus:border-[#D85A30] transition-colors"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D85A30]/50 focus:border-[#D85A30] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D85A30]/50 focus:border-[#D85A30] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D85A30]/50 focus:border-[#D85A30] transition-colors"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D85A30] text-white py-2.5 rounded-md hover:bg-[#c24f29] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium mt-2"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#D85A30] hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
