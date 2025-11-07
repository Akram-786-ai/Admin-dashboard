import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Please fill in all fields");
            return;
        }

        // Simple validation
        const savedUser = localStorage.getItem("registeredUser");

        if (savedUser) {
            const user = JSON.parse(savedUser);
            if (user.email === formData.email && user.password === formData.password) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                navigate("/");
            } else {
                setError("Invalid email or password");
            }
        } else {
            // Demo login
            if (formData.email === "admin@admin.com" && formData.password === "admin123") {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("loggedInUser", JSON.stringify({
                    fullName: "Admin User",
                    email: formData.email
                }));
                navigate("/");
            } else {
                setError("Invalid credentials. Try: admin@admin.com / admin123");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to from-blue-500 via-purple-500 to-pink-500 p-4">
            <div className="w-full max-w-md">
                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to from-blue-600 to-purple-600 px-6 sm:px-8 py-8 sm:py-10 text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl sm:text-4xl">🔐</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">Welcome Back!</h1>
                        <p className="text-blue-100 text-sm sm:text-base mt-2">Login to your admin dashboard</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

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
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                <FiLock className="text-blue-600" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all text-sm sm:text-base"
                        >
                            Login to Dashboard
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
                            </div>
                        </div>

                        {/* Signup Link */}
                        <Link
                            to="/signup"
                            className="block w-full text-center py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all text-sm sm:text-base"
                        >
                            Create New Account
                        </Link>
                    </form>

                    {/* Demo Credentials */}
                    <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t">
                        <p className="text-xs text-gray-600 text-center">
                            <strong>Demo:</strong> admin@admin.com / admin123
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-white text-sm mt-6">
                    © 2024 Admin Dashboard. All rights reserved.
                </p>
            </div>
        </div>
    );
}