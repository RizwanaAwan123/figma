
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    description: string;
}

export default function ProductPage() {
    const router = useRouter();
    const { id } = router.query; // Correct way to get id in Pages Router
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return; // Wait for id to be available

        const fetchProduct = async () => {
            try {
               
              const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                  setProduct(null);
                } else {
                    const data: Product = await response.json();
                    setProduct(data);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!product) {
        return <div className="flex justify-center items-center h-screen">Product not found</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative aspect-square md:aspect-[4/3] w-full rounded-lg overflow-hidden shadow-lg">
                        <Image src={product.imageUrl} alt={product.name} width={500} height={500} priority />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className="text-lg font-bold mb-2">${product.price}</p>
                        {product.originalPrice && <p className="line-through text-gray-500 text-sm mb-2">${product.originalPrice}</p>}
                        <p className="text-gray-700 mb-6">{product.description}</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">Add to Cart</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}