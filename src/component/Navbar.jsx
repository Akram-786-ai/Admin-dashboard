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
        <header className="flex items-center justify-between bg-white shadow px-3 sm:px-5 py-3 md:py-4 rounded-lg sticky top-0 z-40 w-full">
            {/* Left Section */}
            <div className="flex items-center gap-2 sm:gap-4">
                {/* Menu Button (only for mobile/tablet) */}
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                    <FiMenu size={22} className="text-gray-700" />
                </button>

                {/* Title */}
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 truncate">
                    Admin Dashboard
                </h2>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
                {/* User Info */}
                <div className="hidden xs:flex items-center space-x-1 sm:space-x-2 text-gray-600 text-xs sm:text-sm md:text-base">
                    <FiUser className="min-w-[18px]" />
                    <span className="truncate max-w-80px sm:max-w-[150px] md:max-w-none">
                        {user?.fullName || user?.email || "Admin"}
                    </span>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 transition text-xs sm:text-sm md:text-base"
                >
                    <FiLogOut className="min-w-[18px]" />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </header>

    );
}
