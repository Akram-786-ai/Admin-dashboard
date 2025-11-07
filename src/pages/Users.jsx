import React, { useEffect, useState, useMemo } from "react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("id");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    const filtered = useMemo(() => {
        let data = users;

        if (search.trim()) {
            data = data.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        data = [...data].sort((a, b) => {
            if (sortBy === "name") return a.name.localeCompare(b.name);
            return a.id - b.id;
        });

        return data;
    }, [users, search, sortBy]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Users Management</h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-48 border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="id">Sort by ID</option>
                    <option value="name">Sort by Name</option>
                </select>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length > 0 ? (
                                paginated.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-blue-50 transition-colors">
                                        <td className="px-4 py-3 text-sm">{user.id}</td>
                                        <td className="px-4 py-3 text-sm font-medium">{user.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                                        <td className="px-4 py-3 text-sm">{user.address.city}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
                {paginated.length > 0 ? (
                    paginated.map((user) => (
                        <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    ID: {user.id}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                            <p className="text-sm text-gray-500">📍 {user.address.city}</p>
                        </div>
                    ))
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                        No users found
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 sm:px-3 py-1.5 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-2.5 sm:px-3.5 py-1.5 text-sm rounded-lg transition-colors ${currentPage === i + 1
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 sm:px-3 py-1.5 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}