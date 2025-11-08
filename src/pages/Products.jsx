import React, { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
                const uniqueCategories = ["All", ...new Set(data.map((i) => i.category))];
                setCategories(uniqueCategories);
            });
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === "All") setFilteredProducts(products);
        else setFilteredProducts(products.filter((p) => p.category === category));
    };

    const handleSortChange = (sortType) => {
        setSortBy(sortType);
        let sorted = [...filteredProducts];
        if (sortType === "price-asc") sorted.sort((a, b) => a.price - b.price);
        else if (sortType === "price-desc") sorted.sort((a, b) => b.price - a.price);
        else if (sortType === "name-asc") sorted.sort((a, b) => a.title.localeCompare(b.title));
        else if (sortType === "name-desc") sorted.sort((a, b) => b.title.localeCompare(a.title));
        setFilteredProducts(sorted);
    };

    return (
        <div className="p-3 sm:p-4 md:p-6 space-y-4">
            {/* Page Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-gray-800 text-center sm:text-left">
                Products
            </h1>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 sm:gap-4">
                {/* Category Filter */}
                <select
                    className="border border-gray-300 bg-white text-gray-800 p-2 sm:p-2.5 md:p-3 rounded-lg shadow-sm w-full sm:w-1/3 md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.toUpperCase()}
                        </option>
                    ))}
                </select>

                {/* Sort Filter */}
                <select
                    className="border border-gray-300 bg-white text-gray-800 p-2 sm:p-2.5 md:p-3 rounded-lg shadow-sm w-full sm:w-1/3 md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                >
                    <option value="default">Sort By</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="name-asc">Name: A → Z</option>
                    <option value="name-desc">Name: Z → A</option>
                </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {filteredProducts.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white p-3 sm:p-4 rounded-xl shadow hover:shadow-lg transition text-center border border-gray-200"
                    >
                        <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-36 sm:h-44 md:h-48 object-contain mb-3"
                        />
                        <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base md:text-lg truncate">
                            {p.title}
                        </h3>
                        <p className="text-blue-600 font-bold text-sm sm:text-base">${p.price}</p>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">{p.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
