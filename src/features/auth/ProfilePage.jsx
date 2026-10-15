import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { update, deleteThunk } from "../auth/authSlice";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, dispatch } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const result = await dispatch(update(formData));

    if (update.fulfilled.match(result)) {
      toast.success("Profile updated");
    } else {
      toast.error(result.payload || "Failed to update profile");
    }
    setSaving(false);
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Delete your account permanently? This cannot be undone.",
      )
    )
      return;

    setDeleting(true);
    const result = await dispatch(deleteThunk());

    if (deleteThunk.fulfilled.match(result)) {
      toast.success("Account deleted");
      navigate("/");
    } else {
      toast.error(result.payload || "Failed to delete account");
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        My Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-12">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-[#1B2340]/20 rounded px-3 py-2 bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 rounded font-semibold disabled:opacity-50"
          style={{ backgroundColor: "#D85A30", color: "#FDF1EC" }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <div className="border-t border-[#1B2340]/10 pt-6">
        <h2 className="font-semibold text-sm mb-2" style={{ color: "#D85A30" }}>
          Danger Zone
        </h2>
        <p className="text-sm opacity-60 mb-4">
          Deleting your account is permanent and cannot be undone.
        </p>
        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="text-sm font-medium border border-[#D85A30] rounded px-4 py-2 disabled:opacity-50"
          style={{ color: "#D85A30" }}
        >
          {deleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;