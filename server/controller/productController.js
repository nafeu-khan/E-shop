const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const path = require("path");

const getFeatured = async (req, res) => {
  try {
    const featuredProducts = await pool.query(
      "SELECT * FROM products WHERE featured = true");
  
    res.status(200).json({
      message: "Featured products fetched successfully",
      data: featuredProducts.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};
const updateCart = async (req, res) => {
  try {
    const { userid, product_id, quantity } = req.body;
    const query =
      "UPDATE product_cart SET quantity = quantity + $1 WHERE product_cart.user_id = $2 AND product_cart.product_id =$3";
    await pool.query(query, [quantity, userid, product_id]);
    res
      .status(200)
      .send({ message: "Product Added to cart", data: postdata.rows });
  } catch (error) {
    res.json({ error: error.message });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { product_id, userid } = req.body;
    const postdata = await pool.query(
      "DELETE FROM product_cart  WHERE product_cart.user_id = $1 AND product_cart.product_id = $2",
      [userid, product_id]
    );
    res
      .status(200)
      .send({ message: "Product Added to cart", data: postdata.rows });
  } catch (error) {
    res.json({ error: error.message });
  }
};
const getFromCart = async (req, res) => {
  try {
    const { userid } = req.body;
    console.log(userid);
    const cartProducts = await pool.query(
      `SELECT *
           FROM product_cart
           JOIN products ON product_cart.product_id = products.id
           WHERE product_cart.user_id = $1`,
      [userid]
    );
    res.status(200).json({
      message: "Cart products fetched successfully",
      data: cartProducts.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addToCart = async (req, res) => {
  try {
    const { product_id, user_id } = req.body;
    const id = uuidv4();
    const postdata = await pool.query(
      "INSERT INTO product_cart(id, product_id,user_id)VALUES($1, $2, $3) RETURNING * ",
      [id, product_id, user_id]
    );
    console.log(postdata.rows);
    res
      .status(200)
      .send({ message: "Product Added to cart", data: postdata.rows });
  } catch (error) {
    res.json({ error: error.message });
  }
};
const getProduct = async (req, res) => {
  const product_id = req.params.product_id;
  console.log(product_id);
  try {
    const query = "SELECT * FROM products WHERE id = $1";
    const { rows } = await pool.query(query, [product_id]);
    console.log(rows);
    res.status(200).send({
      message: "Product retrieved successfully",
      product: rows,
    });
  } catch (error) {
    console.error("Error fetching the product:", error);
    res.status(500).send({
      message: "Error fetching the product",
    });
  }
};
const getProducts = async (req, res) => {
  try {
    const query = "SELECT * FROM products ";
    const { rows } = await pool.query(query);
    console.log(rows);
    res.status(200).send({
      message: "Products retrieved successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send({
      message: "Error fetching product",
    });
  }
};
const getCategory = async (req, res) => {
  try {
    const query = "SELECT * FROM product_categories";
    const { rows } = await pool.query(query);
    res.status(200).send({
      message: "Category retrieved successfully",
      category: rows,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).send({
      message: "Error fetching category",
    });
  }
};
const createProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_slug,
      product_category,
      product_status,
      product_left,
      product_description,
      product_price,
    } = req.body;
    const filePath = req.file.path;
    const id = uuidv4();
    const postdata = await pool.query(
      "INSERT INTO products (id, product_name,product_slug,product_category,product_status,product_left,product_description,product_price,product_photo)VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9) RETURNING * ",
      [
        id,
        product_name,
        product_slug,
        product_category,
        product_status,
        product_left,
        product_description,
        product_price,
        filePath,
      ]
    );
    res.status(200).send({ message: "Producted Created", data: postdata.rows });
  } catch (error) {
    res.json({ error: error.message });
  }
};
const createCategory = async (req, res) => {
  try {
    console.log(req.body);
    const { category_name, category_slug } = req.body;
    const id = uuidv4();
    const postdata = await pool.query(
      "INSERT INTO product_categories(id, category_name,category_slug)VALUES ($1, $2, $3) RETURNING * ",
      [id, category_name, category_slug]
    );
    res.status(200).send({ message: "Category Created", data: postdata.rows });
  } catch (error) {
    res.json({ error: error.message });
  }
};
module.exports = {
  getProduct,
  getCategory,
  createCategory,
  createProduct,
  getProducts,
  addToCart,
  getFromCart,
  removeFromCart,
  updateCart,
  getFeatured,
};
