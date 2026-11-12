
import { useEffect, useState } from "react";
import { Search, UserRound, ShieldCheck, ShieldOff } from "lucide-react";
import { toast } from "react-toastify";

import adminService from "../../services/adminServices.js";
import Loading from "../../components/common/Loading";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await adminService.getAdminUsers();

      const data =
        response.users ||
        response.data?.users ||
        response.data ||
        [];

      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (user) => {
    const nextStatus = !user.isActive;

    try {
      setUpdatingId(user._id);

      await adminService.updateUserStatus(user._id, nextStatus);

      setUsers((previous) =>
        previous.map((item) =>
          item._id === user._id
            ? { ...item, isActive: nextStatus }
            : item
        )
      );

      toast.success(
        `User ${nextStatus ? "activated" : "deactivated"} successfully.`
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update user status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value) ||
      user.phone?.toLowerCase().includes(value)
    );
  });

  if (loading) return <Loading />;

  return (
    <div className="admin-page">

      <div className="admin-page-heading">
        <div>
          <span className="section-eyebrow">CUSTOMER MANAGEMENT</span>
          <h1>Manage Users</h1>
          <p>View and manage registered Venuza accounts.</p>
        </div>

        <span className="admin-record-count">
          {users.length} Registered Users
        </span>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-panel">
        {filteredUsers.length === 0 ? (
          <div className="admin-empty-state">No users found.</div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Email verification</th>
                  <th>Account status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="admin-user-cell">
                        <div className="admin-user-avatar">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div>
                          <strong>{user.name || "Unnamed User"}</strong>
                          <small>{user.email}</small>
                        </div>
                      </div>
                    </td>

                    <td>{user.phone || "—"}</td>

                    <td>
                      <span className="admin-role-label">
                        {user.role || "customer"}
                      </span>
                    </td>

                    <td>
                      <span className={`admin-status ${user.emailVerified ? "active" : "pending"}`}>
                        {user.emailVerified ? "Verified" : "Not verified"}
                      </span>
                    </td>

                    <td>
                      <span className={`admin-status ${user.isActive ? "active" : "inactive"}`}>
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      {user.role === "admin" ? (
                        <span className="admin-protected-label">
                          <ShieldCheck size={15} /> Protected
                        </span>
                      ) : (
                        <button
                          type="button"
                          className={`admin-status-btn ${user.isActive ? "deactivate" : "activate"}`}
                          onClick={() => handleStatusChange(user)}
                          disabled={updatingId === user._id}
                        >
                          {user.isActive ? (
                            <><ShieldOff size={15} /> Deactivate</>
                          ) : (
                            <><ShieldCheck size={15} /> Activate</>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

export default ManageUsers;
