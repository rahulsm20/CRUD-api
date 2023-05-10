const { addUser, deleteUser, getUser, updateUser,getAllUsers } =require("../lib/users.js");

 async function addHandler(req,res){
    try{
        const id = await addUser(req.body);
        res.status(201).json({id})
    }
    catch(err){
        res.status(400).json(err.message)
    }
}

 async function getHandler(req,res){
    try{
        const user = await getUser(req.params.id);
        if (user=='Please enter a valid ID'){
            res.status(400).json(user)
        }
        else{
            res.status(200).json(user)
        }
    }
    catch(err){
        res.status(404).json(err.message)
    }
}

 async function getAllUsersHandler(req,res){
    try{
        const users=await getAllUsers();
        res.status(200).json(users)
    }
    catch(err){
        res.status(400).json(err.message)
    }
}

 async function updateHandler(req,res){
    try{
        console.log(req.params.id)
        const user = await updateUser(req.params.id,req.body);
        if(user=='Please enter a valid ID'){
            res.status(400).json(user)
        }
        else{
            res.status(200).json(user)
        }
    }
    catch(err){
        res.status(404).json(err.message)
    }
}

 async function deleteHandler(req,res){
    try{
        console.log(req.params.id)
        const user = await deleteUser(req.params.id);
        if(user=='Please enter a valid ID'){
            res.status(400).json(user)
        }
        else{
            res.status(204).json(`User ${req.params.id} deleted`)
        }
    }
    catch(err){
        res.status(404).json(err.message)
    }
}
module.exports= {addHandler,getHandler,deleteHandler,getAllUsersHandler,updateHandler}
