import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtpThunk } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, dispatch } = useAuth();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = location.state?.email;
    console.log("Email from location state:", email);
    const result = await dispatch(verifyOtpThunk({ email, otp }));

    if (verifyOtpThunk.fulfilled.match(result)) {
      navigate("/login");
      toast.success("OTP verified successfully!");
    } else {
      toast.error(result.payload || "Failed to verify OTP");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/40 backdrop-blur-md">
      <div className="relative z-10 w-full max-w-md p-8 bg-white border border-gray-100 rounded-xl shadow-2xl">
        <h2 className="p-4 text-2xl font-bold text-center text-gray-800">
          Verify OTP
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D85A30]/50 focus:border-[#D85A30] transition-colors justify-between p-4"
            maxLength={6}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D85A30] text-white py-2.5 rounded-md hover:bg-[#c24f29] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium mt-5"
          >
            {loading ? "Verifying..." : "Verify "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtpPage;
