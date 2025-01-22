
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import client from "../sanity/lib/client"; // Adjust path if needed

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const query = `*[_type == "products" && _id == $id][0]{
        _id, title, price, "imageUrl": image.asset->url, description
      }`;
      const res = await client.fetch(query, { id });
      setProduct(res);
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = storedCart.findIndex((item: any) => item._id === product._id);

    if (existingIndex !== -1) {
      storedCart[existingIndex].quantity += 1;
    } else {
      storedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    router.push("/cart");
  };

  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
          <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg font-bold mb-2">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button
 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
 onClick={addToCart}
>
 Add to Cart
</button>
</div>
</div>
   </div>
  );
}