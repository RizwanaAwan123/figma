// "use client"
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import  client from "../sanity/lib/client";
// import {  useRouter } from "next/navigation"; // Make sure this path is correct
// // import Notification from "@/components/components/notification/notification";
// // import AnalyticDashboard from "@/components/components/dashboard/AnalyticDashboard";
// import Mainsection from "@/components/mainsection";
// import Feature from "@/components/feauture";
// import Topcategory from "@/components/topcategory";

// export default function Home() {
//   const mockUser = { name: "umer", email: "umerawan@gmail.com" };

//     const [products, setProducts] = useState([]);
//       const [Cart, setCart] = useState<any[]> ([]);
//       const router = useRouter();



//     useEffect(() => {
//         const fetchProducts = async () => {
//             const query = `*[_type == "products"]{
//                 price, "imageUrl": image.asset->url, tags, inventory, title, description, _id, category
//             }`;
//             const res = await client.fetch(query);
//             setProducts(res);
//         };

//         fetchProducts();
//     }, []);
//     const addToCart =(product:any) => {
//       // setCart((prevCart) =>[...prevCart,product]);
//       const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
//       const existingIndex = storedCart.findIndex((item: any) => item._id === product._id);
  
//       if (existingIndex !== -1) {
//         storedCart[existingIndex].quantity += 1;
//       } else {
//         storedCart.push({ ...product, quantity: 1 });
//       }
  
//       localStorage.setItem("cart", JSON.stringify(storedCart));
//       setCart([...storedCart]);
    
  
//     };

//     return (
      
//         <div className="flex justify-center items-center p-3">
//             <div>
//                 <h1 className="text-5xl font-semibold m-2">Welcome to My Store</h1>
//                 <div className="grid grid-cols-4 gap-4">
//                     {products.map((product: any) => (
//      <div key={product._id} className="m-2 bg-slate-50 rounded-lg p-2">
//      <Image
//          src={product.imageUrl}
//          width={333}
//          height={333}
//          alt={product.title}
//          className="rounded-xl"
//      />
//      <div className="text-xl pt-3">{product.title}</div>
//      <div className="font-bold text-lg text-end">{product.price}$</div>
//      <button 
//                                 className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//                                 onClick={() => addToCart(product)}
//                             >
//                                 Add to Cart
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//                 {/* Notification Center */}
//       <div className="container mx-auto px-6">
//         {/* <Notification /> */}
//       </div>

//       {/* Analytics Dashboard */}
//       <div className="container mx-auto px-6 py-12">
//         {/* <AnalyticDashboard sales={10000} traffic={5000} /> */}
//       </div>
        

//                 {/* Cart Display */}
//         <div className="mt-8 p-4 bg-gray-100 rounded-lg">
//           <h2 className="text-2xl font-semibold">Shopping Cart</h2>
//           {Cart.length === 0 ? (
//             <p className="text-gray-500">Your cart is empty.</p>
//           ) : (
//             <ul className="mt-3">
//               {Cart.map((item, index) => (
//                 <li key={index} className="flex justify-between border-b py-2">
//                   <span>{item.title}</span>
//                   <span className="font-bold">{item.price}$</span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Additional Sections */}
//         <div className="m-3">
//           <Mainsection />
//           <Feature />
//           <Topcategory />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";


import AnalyticDashboard from "@/components/components/dashboard/AnalyticDashboard";
import Notification from "@/components/components/notification/notification";
import UserProfile from "@/components/components/UserProfile/UserProfile";
import Feature from "@/components/feauture";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";

import { useState, FormEvent } from "react";

const Home = () => {
    const [user, setUser] = useState(null);
    const [signupError, setSignupError] = useState<string | null>(null);

    const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string };
            email: { value: string };
            password: { value: string };
        };

        const name = target.name.value;
        const email = target.email.value;
        const password = target.password.value;

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setSignupError(null);
                console.log("Signup successful!", userData);
            } else {
                const errorData = await response.json();
                setSignupError(errorData.message || "Signup failed.");
                console.error("Signup failed:", errorData);
            }
        } catch (error) {
            setSignupError("An unexpected error occurred.");
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="bg-blue-80">
            <Navbar/>
            <div>
      {/* Displaying the ID and Name at the top */}
      <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f4f4f4', fontStyle: 'italic', marginBottom: '20px' }}>
        <p style={{ margin: 0 }}>
          Website : <strong>website</strong>
        </p>
        <p style={{ margin: 0 }}>
          ID: <strong>0012345</strong>
        </p>
      </div>
      </div>

            <div className="header flex justify-between items-center p-6 bg-indigo-600 text-white">
                <div></div>
                <div>
                    <UserProfile user={user} />
                </div>
            </div>

            <div className="hero flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16">
                <h1 className="text-4xl font-bold mb-4">Welcome to Comforty</h1>
                <p className="text-lg mb-6">
                    Discover the perfect furniture for your space with free shipping over $50.
                </p>
                <Image
                            src="/chairhome.png"
                            alt="Chair"
                            width={400}
                            height={400}
                            className="w-full max-w-[230px] md:max-w-lg md:h-96 lg:max-w-[500px] lg:h-[400px] object-contain"
                          />
            </div>

            <div className="container mx-auto my-12 px-6">
                <h2 className="text-3xl font-bold text-center mb-8">Signup</h2>
                {signupError && <p className="text-red-500 text-center">{signupError}</p>}
                <form onSubmit={handleSignup} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="umer"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="umerawan@example.com"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="********"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Signup
                    </button>
                </form>
            </div>

            <div className="container mx-auto my-12">
                <Feature />
            </div>

            <div className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Explore Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/shop" className="block">
                        <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                            <div className="relative h-64 w-full">
                                <Image
                                    src="/card.png"
                                    alt="Products"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">Our Products</h3>
                                <p className="text-gray-600">Explore our wide range of products.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-6">
                <Notification  />
            </div>

            <div className="container mx-auto px-6 py-12">
                <AnalyticDashboard sales={10000} traffic={5000} />
            </div>

            <Footer />
        </div>
    );
};

export default Home;