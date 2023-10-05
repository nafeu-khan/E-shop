import React, { useState,useEffect } from 'react'
import { get_category, get_products } from '../services/productService/ProductService';
import ProductSlider from '../components/Product/ProductSlider';

const Shop = () => {
  const [productList,setProductList]=useState([])
  const [categories,setcategoryList]=useState([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await get_category();
        setcategoryList(response.category)
        const response2 = await get_products();
        setProductList(response2.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories(); 
  }, []);
  return (
    <>
      {categories.map((category) => {
        const filteredProducts = productList.filter((product) => product.product_category === category.category_name);
        return (
          <div key={category.id}>
            <h2>{category.category_name}</h2>
            <ProductSlider products={filteredProducts} />
          </div>
        );
        })}
    </>
  );
}

export default Shop