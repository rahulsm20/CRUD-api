import {Client} from 'redis-om'
import dotenv from 'dotenv';
dotenv.config()
export const client = new Client()

export const connect = async()=>{
    if(!client.isOpen()){
            await client.open(process.env.REDIS_URL)
        }
    }
export default {connect,client}