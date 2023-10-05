const app =require('./app')
require('dotenv').config()


const port=process.env.SERVER_PORT||3002
app.listen(port,()=>{
    console.log(`server is running  at http://localhost:${port}`);
})
