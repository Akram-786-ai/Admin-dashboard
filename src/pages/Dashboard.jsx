import React, { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));

        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const cityData = users.reduce((acc, user) => {
        const city = user.address.city;
        acc[city] = (acc[city] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(cityData).map(([name, value]) => ({ name, value }));

    const categoryData = products.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

    const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

    return (
        <div className="space-y-8 px-2 sm:px-4 md:px-6">
            {/* Summary Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <Card title="Total Users" value={users.length} />
                <Card title="Total Products" value={products.length} />
                <Card title="Total Categories" value={pieData.length} />
                <Card title="Active Users" value={Math.floor(users.length * 0.7)} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <ChartCard title="Users per City">
                    <div className="w-full h-60 sm:h-72 md:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                <ChartCard title="Products per Category">
                    <div className="w-full h-60 sm:h-72 md:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="70%"
                                    label
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend wrapperStyle={{ fontSize: "12px" }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>
        </div>
    );
}

function Card({ title, value }) {
    return (
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow hover:shadow-md transition text-center">
            <h4 className="text-gray-500 text-xs sm:text-sm">{title}</h4>
            <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1 sm:mt-2">
                {value}
            </p>
        </div>
    );
}

function ChartCard({ title, children }) {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{title}</h3>
            {children}
        </div>
    );
}
