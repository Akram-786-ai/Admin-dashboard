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
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Users List</h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border rounded-lg p-2 w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-lg p-2 w-full sm:w-1/4 focus:ring-2 focus:ring-blue-400"
                >
                    <option value="id">Sort by ID</option>
                    <option value="name">Sort by Name</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="w-full border-collapse min-w-[600px]">
                    <thead className="bg-blue-600 text-white text-sm sm:text-base">
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
                                    className="border-b hover:bg-blue-50 text-sm sm:text-base"
                                >
                                    <td className="p-3">{user.id}</td>
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.address.city}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded text-sm sm:text-base ${currentPage === i + 1
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
