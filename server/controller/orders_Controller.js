const pool = require("../db");
const { v4: uuidv4 } = require("uuid");


const OrderUser = async (req, res) => {
    try {
      const { customer_name, customer_email, customer_address, customer_phone,user_id } =req.body;
      console.log(customer_name, customer_email, customer_address, customer_phone,user_id)
      const orderId = uuidv4();
      const query =
        "INSERT INTO orders (id, customer_name, customer_email, customer_address, customer_phone,user_id) VALUES ($1, $2, $3, $4, $5,$6) RETURNING id";
      const orderResult = await pool.query(query, [
        orderId,
        customer_name,
        customer_email,
        customer_address,
        customer_phone,
        user_id
      ]);
      console.log("order id ",orderResult.rows[0].id)
      res
        .status(200)
        .send({
          message: `orders table updated`,
          order_id: orderResult.rows[0].id,
        });
    } catch (error) {
      res.json({ error: error.message });
    }
  };
const order_products = async (req, res) => {
  try {
    const { order_id, quantity, product_id, product_price} = req.body;
    console.log(req.body)
    const query =
      "INSERT INTO order_products (id, order_id, product_id, quantity, product_price) VALUES ($1, $2, $3, $4, $5)";
    await pool.query(query, [
      uuidv4(),order_id, product_id,quantity,product_price
    ]);
    res.status(200).send({ message: "Product Added to cart"});
  } catch (error) {
    res.json({ error: error.message });
  }
};



const Orders= async(req,res) => {
    try {
      const result = await pool.query(
        'SELECT o.id, o.customer_name, o.customer_email, o.customer_address, o.customer_phone, ' +
        'op.quantity, op.product_price, p.product_name ' +
        'FROM orders o ' +
        'JOIN order_products op ON o.id = op.order_id ' +
        'JOIN products p ON op.product_id = p.id'
      );
        console.log(result.rows)
      const orders = {};
      result.rows.forEach(row => {
        if (!orders[row.id]) {
          orders[row.id] = {
            id: row.id,
            customer_name: row.customer_name,
            customer_email: row.customer_email,
            customer_address: row.customer_address,
            customer_phone: row.customer_phone,
            order_products: []
          };
        }
        orders[row.id].order_products.push({
          quantity: row.quantity,
          product_price: row.product_price,
          product_name: row.product_name
        });
      });
  
      const ordersArray = Object.values(orders);
      res.json(ordersArray);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = { OrderUser, order_products,Orders };
