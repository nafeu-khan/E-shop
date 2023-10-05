import React, { useState } from 'react';
import { create_category } from '../../services/productService/ProductService';
import { toast } from "react-toastify";
const CreateCategory = () => {
  const [categoryData, setCategoryData] = useState({
    category_name: '',
    category_slug: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await create_category(categoryData);
        toast.success(response.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setProduct({category_name: '',
        category_slug: '',}
        )
      } catch (error) { 
        toast.error(response.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
};
  return (
    <div className="container">
      <h2>Create Product Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category_name">Category Name:</label>
          <input
            type="text"
            className="form-control"
            id="category_name"
            name="category_name"
            value={categoryData.category_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category_slug">category_slug:</label>
          <textarea
            className="form-control"
            id="category_slug"
            name="category_slug"
            value={categoryData.category_slug}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Category</button>
      </form>
    </div>
  );
};

export default CreateCategory;
