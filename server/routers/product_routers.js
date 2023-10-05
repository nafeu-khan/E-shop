const express = require("express");
const {
  createProduct,
  createCategory,
  getCategory,
  getProduct,
  getProducts,
  addToCart,
  getFromCart,
  removeFromCart,
  updateCart,
} = require("../controller/productController");
const product_routers = express.Router();


//file upload
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/product");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
module.export = { storage, upload };

product_routers.post(
  "/create_product",
  upload.single("product_photo"),
  createProduct
);
product_routers.post("/create_category", createCategory);
product_routers.get("/get_category", getCategory);
product_routers.get("/get_products", getProducts);
product_routers.get("/get_product/:product_id", getProduct);
product_routers.post("/add_to_cart",addToCart)
product_routers.post("/get_from_cart",getFromCart)
product_routers.post("/update_cart",updateCart)
product_routers.post("/remove_from_cart",removeFromCart)


module.exports = product_routers;
