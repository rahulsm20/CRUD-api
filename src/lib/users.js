const { connect, client } = require('../db/connect.js');
const {schema} = require('../db/schemas.js')


const idValidator = /^[0-9A-Z]{26}$/;

const validator=(arg)=>{
  return idValidator.test(arg)
}
async function addUser(data) {
  if (!data.username || !data.age || !data.hobbies) {
    throw new Error('Missing required fields');
  } 
  await connect();
  const repository = client.fetchRepository(schema);
  const user = repository.createEntity(data);
  const id = await repository.save(user);
  return id;
}

async function getUser(id) {
  await connect();
  if(validator(id)){
    const repository = client.fetchRepository(schema);
    const user = await repository.fetch(id)
    if (!user.username || !user.age || !user.hobbies) {
      throw new Error('User not found');
    } 
    return user;
  }
  else{
    return 'Please enter a valid ID'
  }

}

async function getAllUsers(){
  await connect();
  const repository = client.fetchRepository(schema);
  const users= await repository.search().return.all()
  return users;
}

async function updateUser(id, data) {
  await connect();
  if (!data.username || !data.age || !data.hobbies) {
    throw new Error('Missing required fields');
  }  
  if(validator(id)){
  const repository = client.fetchRepository(schema);
  const user = await repository.fetch(id);
  if (!user.username || !user.age || !user.hobbies) {
    throw new Error("User doesn't exist");
  } 
  user.username = data.username;
  user.age = data.age;
  user.hobbies = data.hobbies;
  await repository.save(user);
  return user;
}
else{
  return 'Please enter a valid ID'
}
}

async function deleteUser(id) {
  await connect();
  if(validator(id)){
    const repository = client.fetchRepository(schema);
    const user = await repository.fetch(id)
    if (!user.username || !user.age || !user.hobbies) {
      throw new Error("User doesn't exist");
    }
    else{
      await repository.remove(id);
      return 'Successfully deleted user: '+ id
    }
  }
  else{
    return 'Please enter a valid ID'
  }
}

module.exports= {addUser, getUser, updateUser, deleteUser,getAllUsers}