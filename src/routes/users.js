const express =require( 'express');
const router = express.Router()
const {addHandler, getHandler, updateHandler, deleteHandler, getAllUsersHandler }=require('../controllers/users.js')

router.get('/:id',getHandler)
router.put('/:id',updateHandler)
router.delete('/:id',deleteHandler)
router.post('/',addHandler);
router.get('/',getAllUsersHandler)

module.exports= router