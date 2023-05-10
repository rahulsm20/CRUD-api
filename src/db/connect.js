const {Client} =require('redis-om')
// const dotenv = require 'dotenv';
require('dotenv').config()
 const client = new Client()

 const connect = async()=>{
    if(!client.isOpen()){
            await client.open(process.env.REDIS_URL)
        }
    }
module.exports= {connect,client}