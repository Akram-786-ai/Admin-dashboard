import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiBarChart2, FiUsers, FiShoppingCart, FiSettings, FiX } from "react-icons/fi";

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
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                ></div>
            )}

            <aside
                className={`fixed md:static z-50 bg-gray-800 text-white w-64 min-h-screen p-4 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out md:translate-x-0`}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Admin Panel</h2>
                    <button
                        className="md:hidden text-gray-400 hover:text-white"
                        onClick={() => setIsOpen(false)}
                    >
                        <FiX size={22} />
                    </button>
                </div>

                <nav className="flex flex-col space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center px-4 py-2 rounded transition-colors duration-200 
              hover:bg-gray-700 ${location.pathname === item.path
                                    ? "bg-gray-700 text-white"
                                    : "text-gray-300"
                                }`}
                        >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;
