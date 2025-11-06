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
                const uniqueCategories = [
                    "All",
                    ...new Set(data.map((item) => item.category)),
                ];
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
        let sortedProducts = [...filteredProducts];

        if (sortType === "price-asc") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === "price-desc") {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortType === "name-asc") {
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortType === "name-desc") {
            sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilteredProducts(sortedProducts);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Products</h1>


            <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-4">

                <select
                    className="border p-2 rounded-lg shadow-sm"
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
                    className="border p-2 rounded-lg shadow-sm"
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


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-contain mb-4"
                        />
                        <h3 className="font-semibold text-gray-800 mb-2 truncate">
                            {product.title}
                        </h3>
                        <p className="text-blue-600 font-bold">${product.price}</p>
                        <p className="text-gray-500 text-sm mt-1">{product.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
