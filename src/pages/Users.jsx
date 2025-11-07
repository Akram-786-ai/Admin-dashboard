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
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center sm:text-left">
                Users List
            </h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border rounded-lg p-2 sm:p-3 sm:text-black text-sm sm:text-base w-full sm:w-1/2 md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-lg p-2 sm:p-3 sm:text-black text-sm sm:text-base w-full sm:w-1/2 md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="id">Sort by ID</option>
                    <option value="name">Sort by Name</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="w-full border-collapse min-w-[600px] text-sm sm:text-base">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length > 0 ? (
                            paginated.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b hover:bg-blue-50 sm:text-black transition-colors duration-200"
                                >
                                    <td className="p-3">{user.id}</td>
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.address.city}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-4 text-center sm:text-black text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 flex-wrap mt-3 sm:mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded text-sm sm:text-base transition ${currentPage === i + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>

    );
}
