"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "../sanity/lib/client";
import {  useRouter } from "next/navigation"; // Make sure this path is correct
import Notification from "@/components/components/notification/notification";
import AnalyticDashboard from "@/components/components/dashboard/AnalyticDashboard";
import Mainsection from "@/components/mainsection";
import Feature from "@/components/feauture";
import Topcategory from "@/components/topcategory";

export default function Home() {
  const mockUser = { name: "umer", email: "umerawan@gmail.com" };

    const [products, setProducts] = useState([]);
      const [Cart, setCart] = useState<any[]> ([]);
      const router = useRouter();



    useEffect(() => {
        const fetchProducts = async () => {
            const query = `*[_type == "products"]{
                price, "imageUrl": image.asset->url, tags, inventory, title, description, _id, category
            }`;
            const res = await client.fetch(query);
            setProducts(res);
        };

        fetchProducts();
    }, []);
    const addToCart =(product:any) => {
      // setCart((prevCart) =>[...prevCart,product]);
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingIndex = storedCart.findIndex((item: any) => item._id === product._id);
  
      if (existingIndex !== -1) {
        storedCart[existingIndex].quantity += 1;
      } else {
        storedCart.push({ ...product, quantity: 1 });
      }
  
      localStorage.setItem("cart", JSON.stringify(storedCart));
      setCart([...storedCart]);
    
  
    };

    return (
      
        <div className="flex justify-center items-center p-3">
            <div>
                <h1 className="text-5xl font-semibold m-2">Welcome to My Store</h1>
                <div className="grid grid-cols-4 gap-4">
                    {products.map((product: any) => (
     <div key={product._id} className="m-2 bg-slate-50 rounded-lg p-2">
     <Image
         src={product.imageUrl}
         width={333}
         height={333}
         alt={product.title}
         className="rounded-xl"
     />
     <div className="text-xl pt-3">{product.title}</div>
     <div className="font-bold text-lg text-end">{product.price}$</div>
     <button 
                                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
                {/* Notification Center */}
      <div className="container mx-auto px-6">
        <Notification />
      </div>

      {/* Analytics Dashboard */}
      <div className="container mx-auto px-6 py-12">
        <AnalyticDashboard sales={10000} traffic={5000} />
      </div>
        

                {/* Cart Display */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          {Cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="mt-3">
              {Cart.map((item, index) => (
                <li key={index} className="flex justify-between border-b py-2">
                  <span>{item.title}</span>
                  <span className="font-bold">{item.price}$</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Additional Sections */}
        <div className="m-3">
          <Mainsection />
          <Feature />
          <Topcategory />
        </div>
      </div>
    </div>
  );
}