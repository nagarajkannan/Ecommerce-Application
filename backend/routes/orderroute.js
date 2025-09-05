import express from 'express'
import adminauth from '../middleware/adminauth.js'
import authuser from '../middleware/auth.js'
import { allOrders, placeOrder, placeOrderNetBanking, placeOrderUpi, updateStatus, userOrders, verifyUpi } from '../controllers/ordercontroller.js'


const orderRouter=express.Router()

orderRouter.post('/list',adminauth,allOrders)
orderRouter.post('/status',adminauth,updateStatus)


//payment features

orderRouter.post('/place',authuser,placeOrder)
orderRouter.post('/upi',authuser,placeOrderUpi)
orderRouter.post('/netbanking',authuser,placeOrderNetBanking)

//user Feature

orderRouter.post('/userorders',authuser,userOrders)

//verify upi
orderRouter.post("/verifyupi",adminauth,verifyUpi)

export default orderRouter