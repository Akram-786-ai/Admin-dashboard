import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiBarChart2, FiUsers, FiShoppingCart, FiSettings } from "react-icons/fi";

function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", icon: <FiBarChart2 />, path: "/" },
        { name: "Users", icon: <FiUsers />, path: "/users" },
        { name: "Products", icon: <FiShoppingCart />, path: "/products" },
        { name: "Setting", icon: <FiSettings />, path: "/setting" },
    ];

    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <div className="text-2xl font-bold mb-6 text-center">Admin Panel</div>
            <nav className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center px-4 py-2 rounded hover:bg-gray-700 ${location.pathname === item.path ? "bg-gray-700" : "text-gray-300"}`}
                    >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>

    )
}

export default Sidebar