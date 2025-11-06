import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiMenu } from "react-icons/fi";

export default function Navbar({ setIsOpen }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    const rawUser = localStorage.getItem("loggedInUser");
    const user = rawUser ? JSON.parse(rawUser) : null;

    return (
        <header className="flex items-center justify-between bg-white shadow px-3 sm:px-6 py-3 rounded-lg sticky top-0 z-40">
            {/* Left Section */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                    <FiMenu size={22} />
                </button>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
                    Admin Dashboard
                </h2>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3 sm:space-x-5">
                <div className="flex items-center space-x-2 text-gray-600 text-sm sm:text-base">
                    <FiUser />
                    <span>{user?.fullName || user?.email || "Admin"}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 transition text-sm sm:text-base"
                >
                    <FiLogOut />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
}
