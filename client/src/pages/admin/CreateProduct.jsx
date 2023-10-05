import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  create_product,
  get_category,
} from "../../services/productService/ProductService";
import { Navigate } from "react-router-dom";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    product_name: "",
    product_slug: "",
    product_category: "",
    product_status: "",
    product_left: "",
    product_description: "",
    product_price: "",
    product_photo:""
  });
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await get_category();
        console.log(response.category);
        setCategoryList(response.category); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories(); 
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "product_name") {
      const productSlug = value.trim().replace(/\s+/g, "-");
      setProduct({
        ...product,
        [name]: value,
        product_slug: productSlug,
      });
    } else
      setProduct((prevstate) => {
        return { ...prevstate, [name]: value };
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);
    try {
      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("product_slug", product.product_slug);
      formData.append("product_category", product.product_category);
      formData.append("product_status", product.product_status);
      formData.append("product_left", product.product_left);
      formData.append("product_description", product.product_description);
      formData.append("product_price", product.product_price);
      formData.append("product_photo", product.product_photo); 
      const response = await create_product(formData);
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setProduct({
        id: "",
        product_name: "",
        product_slug: "",
        product_category: "",
        product_status: "",
        product_left: "",
        product_description: "",
        product_price: "",
        product_photo:""
      });
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0]; 
    
    setProduct((prevstate) => {
      return { ...prevstate, product_photo: file };
    });
    
  };

  return (
    <div className="container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="product_name"
            value={product.product_name}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Product Slug:</label>
          <input
            type="text"
            name="product_slug"
            value={product.product_slug}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Product Category:</label>
          <select
            name="product_category"
            value={product.product_category}
            className="form-control"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.category_name}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Product Status:</label>
          <input
            type="text"
            name="product_status"
            value={product.product_status}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Product Left:</label>
          <input
            type="text"
            name="product_left"
            value={product.product_left}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Product Description:</label>
          <textarea
            name="product_description"
            value={product.product_description}
            className="form-control"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Product Price:</label>
          <input
            type="text"
            name="product_price"
            value={product.product_price}
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
        <label>Product Photo:</label>
        <input
          type="file"
          name="product_photo"
          className="form-control"
          onChange={handleFileInputChange}
        />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
// {
//   "product_name": "Xiaomi Redmi 11 Prime 4/64 (Unofficial) Global Variant",
//   "product_slug": "Xiaomi-Redmi-11-Prime-4/64-(Unofficial)-Global",
//   "product_category": "'Smartphones'",
//   "product_status": "'available'",
//   "product_left": 10,
//   "product_description": "'Product details of Redmi 12(6/128GB)\\n' +
//     'NO RETURN applicable if the seal is broken.\\n' +
//     '4G LTE, SIM1 + Hybrid (SIM or MicroSD)\\n' +
//     'Display: 6.79 inches, 1080 x 2460 pixels, IPS LCD\\n' +
//     'OS: Android 13 ; MIUI 14; Mediatek Helio G88 (12nm)\\n' +
//     'Dimensions: 168.6 x 76.3 x 8.2 mm (6.64 x 3.00 x 0.32 in)\\n' +
//     'Processor: Octa-core (2x2.0 GHz Cortex-A75 & 6x1.8 GHz Cortex-A55)\\n' +
//     'Memory: 128 GB, 6GB RAM\\n' +
//     'Camera: Rear Triple 50+8+2 MP / Front 8 MP / Video 1080p@30fps\\n' +
//     'GPS, FM Radio, Fingerprint (side mounted), accelerometer, compass\\n' +
//     'Battery: Non-removable Li-Po 5000 mAh battery'",
//   product_price: '13,999'
// }
