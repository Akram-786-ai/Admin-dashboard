import React, { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()),
            fetch("https://fakestoreapi.com/products").then(r => r.json())
        ])
            .then(([usersData, productsData]) => {
                setUsers(usersData);
                setProducts(productsData);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const cityData = users.reduce((acc, user) => {
        const city = user.address?.city;
        if (city) acc[city] = (acc[city] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(cityData).map(([name, value]) => ({ name, value }));

    const categoryData = products.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

    const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                <Card title="Total Users" value={users.length} color="blue" />
                <Card title="Total Products" value={products.length} color="green" />
                <Card title="Categories" value={pieData.length} color="yellow" />
                <Card title="Active Users" value={Math.floor(users.length * 0.7)} color="purple" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
                <ChartCard title="Users per City">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12 }}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                            />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Products per Category">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label={(entry) => entry.name}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
    );
}

function Card({ title, value, color = "blue" }) {
    const colors = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        purple: "bg-purple-500"
    };

    return (
        <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h4 className="text-gray-500 text-xs sm:text-sm mb-2">{title}</h4>
            <p className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colors[color].replace('bg-', 'text-')}`}>
                {value}
            </p>
        </div>
    );
}

function ChartCard({ title, children }) {
    return (
        <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md">
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">{title}</h3>
            <div className="w-full overflow-x-auto">
                {children}
            </div>
        </div>
    );
}