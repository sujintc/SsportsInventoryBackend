import express from 'express'
import { deleteproductdetails, getUserById, getproductdetails, loginform, productdetails, registerUser } from '../Controller/item.controller.js';
import authMiddleware from '../Middleware/auth.middleware.js';

const router=express.Router()

router.post('/product',productdetails)
router.get('/get/product',getproductdetails)
router.delete('/delete/product/:id',deleteproductdetails)
router.post("/register/user",registerUser)
router.post("/login", loginform)
router.get("/getid",authMiddleware,  getUserById)



export default router;