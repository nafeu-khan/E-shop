const {Pool} =require('pg')
require('dotenv').config()

const pool =new Pool ({
    host: "localhost",
    port: 5432,
    user: "postgres",
    database: "e_shopdb" ,
    password: process.env.DB_password,
})
    
module.exports=pool;