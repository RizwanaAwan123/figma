import React, { useState } from 'react';

// Define a type for the product
interface Product {
  id: number;
  name: string;
  price: number;
}

const Wishlist: React.FC = () => {
  // Initialize wishlist as an array of Product objects
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Function to add a product to the wishlist
  const addToWishlist = (product: Product) => {
    // Check if the product already exists in the wishlist
    const exists = wishlist.some((item) => item.id === product.id);
    if (!exists) {
      setWishlist((prevWishlist) => [...prevWishlist, product]);
    } else {
      alert('Product is already in your wishlist!');
    }
  };

  // Function to remove a product from the wishlist
  const removeFromWishlist = (id: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((product) => product.id !== id));
  };

  return (
    <div className="wishlist">
      <h3>Wishlist</h3>
      {wishlist.map((product) => (
        <div key={product.id} className="wishlist-item">
          <h4>{product.name}</h4>
          <button onClick={() => removeFromWishlist(product.id)}>Remove</button>
        </div>
      ))}
      {/* Add an example product to demonstrate functionality */}
      <button
        onClick={() =>
          addToWishlist({ id: 1, name: 'Example Product', price: 100 })
        }
      >
        Add Product to Wishlist
      </button>
    </div>
  );
};

export default Wishlist;
