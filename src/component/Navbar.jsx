import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    const rawUser = localStorage.getItem("loggedInUser");
    const user = rawUser ? JSON.parse(rawUser) : null;

    return (
        <div className="flex items-center justify-between bg-white shadow px-6 py-3 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700">Admin Dashboard</h2>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600">
                    <FiUser />
                    <span>{user?.fullName || user?.email || "Admin"}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
                >
                    <FiLogOut />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
