import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FiBarChart2,
    FiUsers,
    FiShoppingCart,
    FiSettings,
    FiX,
} from "react-icons/fi";

function Sidebar({ isOpen, setIsOpen }) {
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", icon: <FiBarChart2 />, path: "/" },
        { name: "Users", icon: <FiUsers />, path: "/users" },
        { name: "Products", icon: <FiShoppingCart />, path: "/products" },
        { name: "Settings", icon: <FiSettings />, path: "/setting" },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden backdrop-blur-sm"
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:static z-50 bg-gray-800 text-white w-64 h-full md:min-h-screen p-4 flex flex-col justify-between transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out md:translate-x-0 shadow-lg md:shadow-none`}
            >
                {/* Top Section */}
                <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold whitespace-nowrap">
                            Admin Panel
                        </h2>
                        <button
                            className="md:hidden text-gray-400 hover:text-white transition"
                            onClick={() => setIsOpen(false)}
                        >
                            <FiX size={22} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col space-y-1 sm:space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 
                  hover:bg-gray-700 hover:pl-5 ${location.pathname === item.path
                                        ? "bg-gray-700 text-white"
                                        : "text-gray-300"
                                    }`}
                            >
                                <span className="mr-3 text-lg sm:text-xl">{item.icon}</span>
                                <span className="text-sm sm:text-base">{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Footer Section (optional future use) */}
                <div className="hidden md:block text-gray-400 text-xs text-center mt-4">
                    © 2025 Admin Dashboard
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
