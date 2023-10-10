import React, { useState, useEffect } from "react";
import axios from "axios";

const Featured_products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products/featured"); // Backend endpoint to fetch featured products
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFeatureToggle = async (productId, isFeatured) => {
    try {
      await axios.put(`/api/products/${productId}`, { isFeatured }); // Backend endpoint to update product as featured
      // After updating, you can refresh the products list or update the specific product in the state
      // Example: fetchProducts();
    } catch (error) {
      console.error("Error updating featured status:", error);
    }
  };

  return (
    <div>
      <h2>Featured Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.product_name} - {product.product_category}
            <button onClick={() => handleFeatureToggle(product.id, !product.isFeatured)}>
              {product.isFeatured ? "Remove from Featured" : "Add to Featured"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Featured_products;
