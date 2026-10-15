import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUsers, updateUserRole, deleteUser } from "../../api/adminApi";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null); // tracks whichever row has a request in flight

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await getAllUsers();
      setUsers(data.users || data.data || data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleToggle = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    if (!window.confirm(`Change ${user.name}'s role to "${newRole}"?`)) return;

    setBusyId(user._id);
    try {
      await updateUserRole(user._id, { role: newRole });
      toast.success(`${user.name} is now ${newRole}`);
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, role: newRole } : u)),
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update role");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete user "${user.name}"? This cannot be undone.`)) return;

    setBusyId(user._id);
    try {
      await deleteUser(user._id);
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        All Users
      </h1>

      {users.length === 0 ? (
        <p className="opacity-60 text-center py-20">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1B2340]/10 text-left opacity-60">
                <th className="py-3 pr-4 font-medium">Name</th>
                <th className="py-3 pr-4 font-medium">Email</th>
                <th className="py-3 pr-4 font-medium">Role</th>
                <th className="py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-[#1B2340]/10">
                  <td className="py-3 pr-4">{u.name}</td>
                  <td className="py-3 pr-4 opacity-70">{u.email}</td>
                  <td className="py-3 pr-4">
                    <button
                      onClick={() => handleRoleToggle(u)}
                      disabled={busyId === u._id}
                      className="px-2 py-1 rounded text-xs font-medium disabled:opacity-40"
                      style={{
                        backgroundColor: u.role === "admin" ? "#1B2340" : "#1B23401A",
                        color: u.role === "admin" ? "#FDF1EC" : "#1B2340",
                      }}
                      title="Click to toggle role"
                    >
                      {u.role}
                    </button>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => handleDelete(u)}
                      disabled={busyId === u._id}
                      className="text-sm font-medium hover:underline disabled:opacity-40"
                      style={{ color: "#D85A30" }}
                    >
                      {busyId === u._id ? "Working..." : "Delete"}
                    </button>
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

export default AdminUserList;