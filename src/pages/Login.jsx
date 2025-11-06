import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState({});

    const handleOnchange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const register = () => {
        navigate("/Signup");
    };

    const OnSubmit = (e) => {
        e.preventDefault();

        const validationError = {};
        if (!data.email.trim()) validationError.email = "Please enter your email";
        if (!data.password.trim())
            validationError.password = "Please enter your password";

        setError(validationError);

        if (Object.keys(validationError).length === 0) {
            const users = JSON.parse(localStorage.getItem("users")) || [];

            const user = users.find(
                (user) => user.email === data.email && user.password === data.password
            );

            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                localStorage.setItem("isLoggedIn", "true");

                alert(`Welcome back, ${user.username || user.email}!`);
                navigate("/");
            } else {
                setError({ general: "Invalid email or password" });
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen  from-purple-500 to-indigo-600 px-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>

                <form onSubmit={OnSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2 font-medium text-gray-700">Email</label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            name="email"
                            type="email"
                            value={data.email}
                            placeholder="Enter your email"
                            onChange={handleOnchange}
                        />
                        {error.email && (
                            <span className="text-red-500 text-sm">{error.email}</span>
                        )}
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            name="password"
                            type="password"
                            value={data.password}
                            placeholder="Enter your password"
                            onChange={handleOnchange}
                        />
                        {error.password && (
                            <span className="text-red-500 text-sm">{error.password}</span>
                        )}
                    </div>

                    {error.general && (
                        <p className="text-red-500 mb-2 text-center">{error.general}</p>
                    )}

                    <button
                        className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                        type="submit"
                    >
                        Login
                    </button>

                    <p className="mt-4 text-center text-gray-700 text-sm md:text-base">
                        Don't have an account?{" "}
                        <span
                            className="text-indigo-600 font-medium cursor-pointer hover:underline"
                            onClick={register}
                        >
                            Register
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
