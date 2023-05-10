const express =require( 'express');
const router = express.Router()
const {addHandler, getHandler, updateHandler, deleteHandler, getAllUsersHandler }=require('../controllers/users.js')

router.put('/:id',updateHandler)
router.delete('/:id',deleteHandler)
router.get('/:id',getHandler)
router.post('/',addHandler);
router.get('/',getAllUsersHandler)

module.exports= router