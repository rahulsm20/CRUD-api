import { Entity, Schema } from 'redis-om';
import {connect,client} from './connect.js'
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

await connect();
const repository = client.fetchRepository(schema);
await repository.createIndex();

export {schema};
