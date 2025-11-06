import React, { useState } from "react";

export default function Setting() {
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
        <div className="bg-white shadow p-4 sm:p-6 rounded-xl max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center sm:text-left">
                Settings
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Theme</label>
                    <select
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">New Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
