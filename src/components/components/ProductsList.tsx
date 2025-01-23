import React, { useEffect, useState } from "react";
import Image from "next/image";
import  { client }  from "@/sanity/lib/client";

interface Product {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // Loading state
  const [error, setError] = useState<string | null>(null);  // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "product"] {
          name,
          price,
          description,
          "imageUrl": image.asset->url
        }`;

        const data = await client.fetch(query);
        setProducts(data);
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching products:", error); // Log error for debugging
        setError("Failed to fetch products");  // Handle error
        setLoading(false);  // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  // Show loading message while data is being fetched
  if (loading) return <div>Loading...</div>;

  // Show error message if there was an error
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map((product, index) => (
          <div key={index}>
            <h2>{product.name}</h2>
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={200}
              />
            )}
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
