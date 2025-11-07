import React, { useState } from "react";
import { FiSave, FiUser, FiMail, FiLock, FiMoon } from "react-icons/fi";

export default function Settings() {
    const [formData, setFormData] = useState({
        name: "Admin User",
        email: "mohammadakram5224@gmail.com",
        theme: "light",
        password: "",
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("✅ Settings updated successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to from-blue-600 to-blue-700 px-4 sm:px-6 md:px-8 py-6 sm:py-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Settings</h2>
                    <p className="text-blue-100 text-sm sm:text-base mt-2">Manage your account preferences</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <FiUser className="text-blue-600" />
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <FiMail className="text-blue-600" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Theme Selection */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <FiMoon className="text-blue-600" />
                            Theme Preference
                        </label>
                        <select
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                        >
                            <option value="light">Light Mode</option>
                            <option value="dark">Dark Mode</option>
                            <option value="auto">Auto (System)</option>
                        </select>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <FiLock className="text-blue-600" />
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter new password (optional)"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <p className="text-xs sm:text-sm text-gray-500">
                            Leave blank to keep current password
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all font-medium text-sm sm:text-base"
                        >
                            <FiSave />
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({
                                name: "Admin User",
                                email: "mohammadakram5224@gmail.com",
                                theme: "light",
                                password: "",
                            })}
                            className="flex-1 sm:flex-none px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm sm:text-base text-gray-700"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>

            {/* Info Card */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">ℹ️ Account Information</h3>
                <p className="text-xs sm:text-sm text-blue-700">
                    Your account data is securely stored. Changes will be applied immediately after saving.
                </p>
            </div>
        </div>
    );
}