import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDatabase from './config/db.js';

import userRoutes from './routes/user.route.js';
import auditionPostRoutes from './routes/auditionpost.route.js';
import applicationRoutes from './routes/application.routes.js';
import endorsementRoutes from './routes/endorsement.routes.js';
import messageRoutes from './routes/message.route.js';
import conversationRoutes from './routes/conversation.route.js';
import favoriteRoutes from './routes/favorite.route.js';
import reportRoutes from './routes/report.route.js';

import { errorHandler, notFound } from './middlewares/error.js';

dotenv.config();

connectDatabase();

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/auditionposts', auditionPostRoutes);
app.use('/applications', applicationRoutes);
app.use('/endorsements', endorsementRoutes);
app.use('/messages', messageRoutes);
app.use('/conversations', conversationRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/reports', reportRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
