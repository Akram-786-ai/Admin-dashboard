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
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card title="Total Users" value={users.length} />
                <Card title="Total Products" value={products.length} />
                <Card title="Total Categories" value={pieData.length} />
                <Card title="Active Users" value={Math.floor(users.length * 0.7)} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Users per City">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Products per Category">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
    );
}

function Card({ title, value }) {
    return (
        <div className="bg-white p-5 rounded-xl shadow text-center">
            <h4 className="text-gray-500 text-sm">{title}</h4>
            <p className="text-2xl font-bold text-blue-600 mt-2">{value}</p>
        </div>
    );
}

function ChartCard({ title, children }) {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            {children}
        </div>
    );
}
