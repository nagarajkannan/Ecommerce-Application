import express from 'express'
import authUser from '../middleware/auth.js';
import { addToCart,updateToCart,getUserCart } from '../controllers/cartcontroller.js';

const cartRouter=express.Router();

cartRouter.post("/get",authUser,getUserCart)
cartRouter.post("/add",authUser,addToCart)
cartRouter.post("/update",authUser,updateToCart)


export default cartRouter