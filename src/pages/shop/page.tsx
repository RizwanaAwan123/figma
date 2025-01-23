"use client";

import React, { useEffect, useState } from "react";


import Image from "next/image";
import FilterPanel from "@/components/components/FilterPanel/FilterPanel";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially, show all products

        // Extract unique categories from product data
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search query
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter products based on search query
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered); // Update the displayed products
  };

  // Handle filter by category
  const handleFilter = (category: string) => {
    if (category === "All") {
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearch} // Handle search
            className="w-full p-3 border rounded-md"
          />
        </div>

        {/* Filter Panel */}
        <div className="mb-6">
          <FilterPanel
            categories={["All", ...categories]} // Add "All" as an option
            onFilter={handleFilter}
          />
        </div>

        {/* Product List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.length === 0 ? (
              <p>No products found.</p> // Message when no products match the search
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 shadow hover:shadow-lg"
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    width={200}
                    height={200}
                  />
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-700 mb-2">${product.price}</p>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
