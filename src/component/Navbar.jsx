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
        <header className="sticky top-0 z-20 bg-white shadow-md">
            <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 md:py-4">
                {/* Left: Hamburger + Title */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <FiMenu size={22} className="text-gray-700" />
                    </button>
                    <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                        Admin Dashboard
                    </h1>
                </div>

                {/* Right: User + Logout */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* User Info - Hidden on very small screens */}
                    <div className="hidden xs:flex items-center gap-2 text-gray-600 text-sm md:text-base">
                        <FiUser className="text-gray-500" />
                        <span className="max-w-[100px] sm:max-w-[150px] truncate">
                            {user?.fullName || user?.email || "Admin"}
                        </span>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm md:text-base"
                    >
                        <FiLogOut />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
}