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
        if (category === "All") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter((p) => p.category === category));
        }
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
        <div className="p-2 sm:p-4 space-y-4">
            <h1 className="text-2xl font-bold mb-3">Products</h1>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-3">
                <select
                    className="border p-2 rounded-lg shadow-sm w-full sm:w-auto"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.toUpperCase()}
                        </option>
                    ))}
                </select>

                <select
                    className="border p-2 rounded-lg shadow-sm w-full sm:w-auto"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition text-center"
                    >
                        <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-40 sm:h-48 object-contain mb-3"
                        />
                        <h3 className="font-semibold text-gray-800 mb-1 truncate">{p.title}</h3>
                        <p className="text-blue-600 font-bold">${p.price}</p>
                        <p className="text-gray-500 text-sm mt-1">{p.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
