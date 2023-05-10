const express =require('express')
const app=express()
const {connect} = require('./db/connect.js')
const users =require( './routes/users.js')
app.use(express.json());
require('dotenv').config();
app.listen(process.env.PORT,()=>console.log(`Running on port ${process.env.PORT}`))

try{
    connect();
    console.log('Connected to DB')  
}
catch{
    console.log('Failed to connect to DB')
}

app.use('/api/users',users)
app.use('*',(req,res)=>res.status(404).json("Resource doesn't exist"))

module.exports= app