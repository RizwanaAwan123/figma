

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const updateQuantity = (id: string, action: "increase" | "decrease") => {
    const updatedCart = cart.map((product) => {
      if (product._id === id) {
        const newQuantity = action === "increase" ? product.quantity + 1 : product.quantity - 1;
        return { ...product, quantity: Math.max(newQuantity, 1) };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeProduct = (id: string) => {
    const updatedCart = cart.filter((product) => product._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotal = () => cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((product) => (
          <div key={product._id} className="flex items-center gap-4 border-b pb-4">
            <Image src={product.imageUrl} alt={product.title} width={80} height={80} className="rounded-lg" />
            <div className="flex-1">
              <h2>{product.title}</h2>
              <p>${product.price}</p>
              <button onClick={() => updateQuantity(product._id, "increase")}>+</button>
              <span>{product.quantity}</span>
              <button onClick={() => updateQuantity(product._id, "decrease")}>-</button>
            </div>
            <button onClick={() => removeProduct(product._id)}>Remove</button>
          </div>
        ))
    )}
    <p className="mt-6 font-bold">Total: ${getTotal()}</p>
   </div>
  );
}