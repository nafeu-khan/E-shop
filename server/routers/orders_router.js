const express=require("express")
const { OrderUser, order_products, Orders } = require("../controller/orders_Controller")
const orders_router=express.Router()

orders_router.get("/",Orders)
orders_router.post("/user_info",OrderUser)
orders_router.post("/product_orders",order_products)

module.exports=orders_router