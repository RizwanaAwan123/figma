import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  return (
    <div>
      <h3>Related Products</h3>
      <div className="related-products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
