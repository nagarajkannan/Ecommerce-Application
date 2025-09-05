import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDb from './config/mongodb.js'
import cloudinary from './config/cloudnary.js'
import userrouter from './routes/userroute.js'
import productrouter from './routes/productroute.js'

import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderroute.js'
import profilerouter from './routes/profileroute.js'
//app config
const app=express()
const port=process.env.port || 4000
connectDb();
import cors from 'cors';
app.use(cors({
  origin: ['https://ecommerce-application-2-162t.onrender.com']
}));


//middlewares
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.use('/api/user/',userrouter)
app.use('/api/product/',productrouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/profile',profilerouter)
 
app.get('/',(req,res)=>{
    res.send("home")
})

app.listen(port,()=>{console.log("server running")})