"use client";

import { useEffect, useState } from "react";
import client  from "@/sanity/lib/client";

import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const builder = imageUrlBuilder(client);

const urlFor = (source: { asset: { _ref: string } } | undefined): string => {
  if (!source?.asset?._ref) {
    return "/placeholder.jpg";
  }
  return builder.image(source.asset._ref).url();
};

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

interface RawProduct {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount?: number;
  image?: { asset: { _ref: string } };
  badge?: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const data = await client.fetch<RawProduct[]>(`*[_type == "products"]{
        _id,
        title,
        price,
        "originalPrice": priceWithoutDiscount,
        image,
        badge
      }`);

      const formattedProducts = data.map((product) => ({
        id: product._id,
        name: product.title,
        price: product.price,
        originalPrice: product.priceWithoutDiscount,
        imageUrl: urlFor(product.image),
        isNew: product.badge === "New",
        isOnSale: product.badge === "Sale",
      }));
      setProducts(formattedProducts);
      setFilteredProducts(formattedProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterProducts(query, selectedCategory);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    filterProducts(searchQuery, category);
  };

  const filterProducts = (query: string, category: string) => {
    let filtered = products;

    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }

    if (category && category !== "all") {
      filtered = filtered.filter((product) =>
        (product.isNew && category === "new") || (product.isOnSale && category === "sale")
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    alert(`${product.name} added to cart!`); // Simple alert for demo
  };

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded-lg p-2 w-full md:w-1/2 mb-4 md:mb-0 md:mr-4"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border rounded-lg p-2 w-full md:w-1/2"
          >
            <option value="all">All Categories</option>
            <option value="new">New Arrivals</option>
            <option value="sale">On Sale</option>
          </select>
        </div>

        <h1 className="text-center text-4xl font-bold my-8">Our Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                  />
                </div>
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-medium truncate mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center mb-4"> {/* Added margin bottom */}
                  <p className="text-gray-700 mr-2">${product.price}</p>
                  {product.originalPrice && (
                    <p className="text-gray-500 line-through">
                      ${product.originalPrice}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;