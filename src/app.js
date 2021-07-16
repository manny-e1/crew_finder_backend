import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDatabase from './config/db.js';

import userRoutes from './routes/user.route.js';

dotenv.config();

connectDatabase();

const app = express();


app.use(cors());
app.use(express.json());


app.use('/users', userRoutes);

export default app;