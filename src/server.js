import express from 'express'
const app=express()
import {connect}  from './db/connect.js'
import users from './routes/users.js'
app.use(express.json());

app.listen(5000,()=>console.log('Running on port 5000'))

try{
    await connect();
    console.log('Connected to DB')  
}
catch{
    console.log('Failed to connect to DB')
}

app.use('/api/users',users)
app.use('*',(req,res)=>res.status(404).json("Resource doesn't exist"))

export default app