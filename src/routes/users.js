import express from 'express';
const router = express.Router()
import {addHandler, getHandler, updateHandler, deleteHandler, getAllUsersHandler }  from '../controllers/users.js'

router.put('/update/:id',updateHandler)
router.delete('/delete/:id',deleteHandler)
router.get('/:id',getHandler)
router.post('/',addHandler);
router.get('/',getAllUsersHandler)

export default router