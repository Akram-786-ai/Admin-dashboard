import React, { useState } from "react";

export default function Setting() {
    const [formData, setFormData] = useState({
        name: "Admin User",
        email: "mohammadakram5224@gmail.com",
        theme: "light",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("✅ Settings updated successfully!");
    };

    return (
        <div className="bg-white shadow p-4 sm:p-6 md:p-8 rounded-xl max-w-md sm:max-w-2xl md:max-w-3xl mx-auto mt-6 sm:mt-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-700 text-center sm:text-left">
                Settings
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Full Name */}
                <div>
                    <label className="block text-sm sm:text-base text-gray-600 mb-1">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className="w-full sm:text-black border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm sm:text-base text-gray-600 mb-1">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full sm:text-black border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Theme Selector */}
                <div>
                    <label className="block text-sm sm:text-base text-gray-600 mb-1">Theme</label>
                    <select
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                        className="w-full sm:text-black border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>

                {/* Password Change */}
                <div>
                    <label className="block text-sm sm:text-base text-gray-600 mb-1">New Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full sm:text-black border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Save Button */}
                <div className="flex justify-center sm:justify-end pt-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base w-full sm:w-auto"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>

    );
}
