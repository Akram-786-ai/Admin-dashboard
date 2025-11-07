import React, { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
                const uniqueCategories = ["All", ...new Set(data.map((i) => i.category))];
                setCategories(uniqueCategories);
                setLoading(false);
            })
            .catch(() => setLoading(false));
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">Loading products...</div>
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Products Catalog</h1>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <select
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat === "All" ? "All Categories" : cat.toUpperCase()}
                        </option>
                    ))}
                </select>

                <select
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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

            {/* Products Count */}
            <div className="text-sm text-gray-600">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                {filteredProducts.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                        <div className="aspect-square p-4 bg-gray-50 flex items-center justify-center overflow-hidden">
                            <img
                                src={p.image}
                                alt={p.title}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-3 sm:p-4">
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-1 line-clamp-2 min-h-2.5rem">
                                {p.title}
                            </h3>
                            <p className="text-blue-600 font-bold text-lg sm:text-xl mb-1">
                                ${p.price.toFixed(2)}
                            </p>
                            <p className="text-gray-500 text-xs sm:text-sm capitalize">
                                {p.category}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">No products found</p>
                    <p className="text-sm mt-2">Try changing your filters</p>
                </div>
            )}
        </div>
    );
}