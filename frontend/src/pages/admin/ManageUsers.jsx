
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ManageUsers.css";

function ManageUsers() {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Rahul Sharma",
            email: "rahul@example.com",
            role: "Customer",
            status: "Active"
        },
        {
            id: 2,
            name: "Priya Reddy",
            email: "priya@example.com",
            role: "Organizer",
            status: "Active"
        },
        {
            id: 3,
            name: "Arjun Kumar",
            email: "arjun@example.com",
            role: "Customer",
            status: "Blocked"
        },
        {
            id: 4,
            name: "Sneha Patel",
            email: "sneha@example.com",
            role: "Organizer",
            status: "Active"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole =
            roleFilter === "All" || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    const toggleUserStatus = (id) => {
        setUsers((previousUsers) =>
            previousUsers.map((user) =>
                user.id === id
                    ? {
                        ...user,
                        status:
                            user.status === "Active" ? "Blocked" : "Active"
                    }
                    : user
            )
        );
    };

    return (
        <div className="manage-users-page">

            <aside className="manage-users-sidebar">
                <h2>GatherGrid</h2>
                <p>ADMIN PANEL</p>

                <nav>
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/users" className="active">
                        Manage Users
                    </Link>
                    <Link to="/admin/events">Manage Events</Link>
                    <Link to="/admin/bookings">Manage Bookings</Link>
                    <Link to="/admin/profile">My Profile</Link>
                    <Link to="/">Visit Website</Link>
                </nav>
            </aside>

            <main className="manage-users-main">

                <header className="manage-users-header">
                    <div>
                        <h1>Manage Users</h1>
                        <p>View and manage customer and organizer accounts.</p>
                    </div>
                </header>

                <section className="users-summary">
                    <div className="users-summary-card">
                        <h3>{users.length}</h3>
                        <p>Total Users</p>
                    </div>

                    <div className="users-summary-card">
                        <h3>
                            {users.filter((user) => user.role === "Customer").length}
                        </h3>
                        <p>Customers</p>
                    </div>

                    <div className="users-summary-card">
                        <h3>
                            {users.filter((user) => user.role === "Organizer").length}
                        </h3>
                        <p>Organizers</p>
                    </div>

                    <div className="users-summary-card">
                        <h3>
                            {users.filter((user) => user.status === "Blocked").length}
                        </h3>
                        <p>Blocked Users</p>
                    </div>
                </section>

                <section className="users-management-card">

                    <div className="users-toolbar">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="All">All Roles</option>
                            <option value="Customer">Customer</option>
                            <option value="Organizer">Organizer</option>
                        </select>
                    </div>

                    <div className="users-table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <span
                                                    className={
                                                        user.status === "Active"
                                                            ? "user-status-active"
                                                            : "user-status-blocked"
                                                    }
                                                >
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className={
                                                        user.status === "Active"
                                                            ? "block-user-btn"
                                                            : "unblock-user-btn"
                                                    }
                                                    onClick={() =>
                                                        toggleUserStatus(user.id)
                                                    }
                                                >
                                                    {user.status === "Active"
                                                        ? "Block"
                                                        : "Unblock"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="no-users">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </section>

            </main>

        </div>
    );
}

export default ManageUsers;
