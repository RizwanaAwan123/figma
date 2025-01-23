

// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function CartPage() {
//   const [cart, setCart] = useState<any[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
//   }, []);

//   const updateQuantity = (id: string, action: "increase" | "decrease") => {
//     const updatedCart = cart.map((product) => {
//       if (product._id === id) {
//         const newQuantity = action === "increase" ? product.quantity + 1 : product.quantity - 1;
//         return { ...product, quantity: Math.max(newQuantity, 1) };
//       }
//       return product;
//     });
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const removeProduct = (id: string) => {
//     const updatedCart = cart.filter((product) => product._id !== id);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const getTotal = () => cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);

//   return (
//     <div className="container mx-auto px-6 py-12">
//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         cart.map((product) => (
//           <div key={product._id} className="flex items-center gap-4 border-b pb-4">
//             <Image src={product.imageUrl} alt={product.title} width={80} height={80} className="rounded-lg" />
//             <div className="flex-1">
//               <h2>{product.title}</h2>
//               <p>${product.price}</p>
//               <button onClick={() => updateQuantity(product._id, "increase")}>+</button>
//               <span>{product.quantity}</span>
//               <button onClick={() => updateQuantity(product._id, "decrease")}>-</button>
//             </div>
//             <button onClick={() => removeProduct(product._id)}>Remove</button>
//           </div>
//         ))
//     )}
//     <p className="mt-6 font-bold">Total: ${getTotal()}</p>
//    </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";


interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

export default function CartPage() {
    const [cart, setCart] = useState<Product[]>([]);
    const router = useRouter();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(savedCart);
    }, []);

    const updateQuantity = (id: string, action: "increase" | "decrease") => {
        const updatedCart = cart.map((product) => {
            if (product.id === id) {
                const newQuantity =
                    action === "increase" ? product.quantity + 1 : product.quantity - 1;
                return { ...product, quantity: Math.max(newQuantity, 1) }; // Ensure quantity stays >= 1
            }
            return product;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeProduct = (id: string) => {
        const updatedCart = cart.filter((product) => product.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const getTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    };

    const handleCheckout = () => {
        router.push("/checkout");
    };

    const continueShopping = () => {
        router.push("/shop");
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6">Bag</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: Product List */}
                <div className="col-span-2 space-y-6">
                    {cart.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center gap-4 border-b pb-4"
                        >
                            <div className="relative w-24 h-24 rounded overflow-hidden">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">
                                    {product.name}
                                </h2>
                                <p className="text-gray-600">Price: ${product.price}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                                        onClick={() =>
                                            updateQuantity(product.id, "decrease")
                                        }
                                    >
                                        -
                                    </button>
                                    <span className="font-semibold">
                                        {product.quantity}
                                    </span>
                                    <button
                                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                                        onClick={() =>
                                            updateQuantity(product.id, "increase")
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <button
                                    className="text-gray-500 hover:text-red-500"
                                    onClick={() => removeProduct(product.id)}
                                >
                                    Delete
                                </button>
                                <button className="text-gray-500 hover:text-blue-500">
                                    Favourite
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Summary */}
                <div className="space-y-6">
                    <div className="border p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>${getTotal()}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span>Estimated Delivery & Handling</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${getTotal()}</span>
                        </div>
                        <button
                            className="bg-teal-500 text-white font-bold py-3 px-6 w-full rounded mt-4 hover:bg-teal-600"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                    <button
                        className="bg-gray-200 text-gray-700 font-bold py-3 px-6 w-full rounded hover:bg-gray-300"
                        onClick={continueShopping}
                    >
                        Continue Shopping
                    </button>
            
                
                </div>
            </div>
        <Footer/>
        </div>
    );
}