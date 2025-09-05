import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDb from './config/mongodb.js';
import cloudinary from './config/cloudnary.js';
import userrouter from './routes/userroute.js';
import productrouter from './routes/productroute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderroute.js';
import profilerouter from './routes/profileroute.js';

// App config
const app = express();
const port = process.env.PORT || 4000;

connectDb();

// CORS configuration
app.use(cors({
  origin: ['https://ecommerce-application-2-162t.onrender.com'], // frontend URL
  credentials: true,
}));

// Middlewares
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/user/', userrouter);
app.use('/api/product/', productrouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/profile', profilerouter);

// Test route
app.get('/', (req, res) => {
    res.send("Home");
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
