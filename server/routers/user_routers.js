const express =require("express");
const {getUser,postUser,loginController} = require("../controller/userControlller");
const user_routers =express.Router()

user_routers.get('/:userid',getUser)
user_routers.post('/register',postUser)
user_routers.post('/login',loginController)

module.exports=user_routers;