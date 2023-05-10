const { Entity, Schema } = require('redis-om');
const {connect,client} = require('./connect.js');
class User extends Entity {}
const schema = new Schema(
  User,
  {
    username: { type: 'string', required: true },
    age: { type: 'number', required: true },
    hobbies: { type: 'string[]', required: true }
  },
  {
    dataStructure: 'JSON',
  }
);
// const createIndex=async()=>{
   connect();
  const repository = client.fetchRepository(schema);
   repository.createIndex();  
// }
// createIndex()
module.exports= {schema};
