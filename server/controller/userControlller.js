const users = require("../model/userModel")
const pool  = require ("../db")
const {v4:uuidv4}=require("uuid")
const bcrypt= require("bcrypt")


const getUser=async (req,res)=>{
    const userid = req.params.userid;
    try {
        const query = "SELECT * FROM users WHERE id = $1"; 
        const { rows } = await pool.query(query, [userid]);
        res.status(200).send({
            message: "Users retrieved successfully",
            user: rows
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({
            message: "Error fetching users"
        });
    }
};
const postUser = async (req, res) => {
    try {
        const {name, email, password, address, phone, role_id ="user"} = req.body; 
        const id = uuidv4();
        const hashedPassword =await bcrypt.hash(password, 5);
        const postdata = await pool.query("INSERT INTO users(id, username, email, password, address, phone,role_id) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING * ", [id, name, email, hashedPassword, address, phone,role_id]);
        res.status(200).send({ message: "data posted", data: postdata.rows });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await pool.query(userQuery, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email ' });
        }

        const hashedPassword = rows[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid  password' });
        }
        console.log(rows[0] )
        res.status(200).json({ message: 'Login successful', user: rows[0] });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports= {getUser,postUser,loginController}