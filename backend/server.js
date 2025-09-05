import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import userrouter from './routes/userroute.js';
import productrouter from './routes/productroute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderroute.js';
import profilerouter from './routes/profileroute.js';

const app = express();
const port = process.env.port || 4000;

// Connect to MongoDB
connectDb();

// Configure CORS properly
app.use(cors({
  origin: '*', // allow all for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
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

// Default route
app.get('/', (req, res) => res.send("home"));

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
