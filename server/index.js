import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import connectDB from './config/db.js';
import ipoRoutes from './routes/ipoRoutes.js';
import marketRoutes from './routes/marketRoutes.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => {
  res.send('Welcome to the IPO Tracker API');
});

app.use('/api/ipos', ipoRoutes);
app.use('/api/market', marketRoutes);


connectDB().then(() =>
  app.listen(process.env.PORT, () =>
    console.log(`IPO Tracker Server on port : ${process.env.PORT}`)
  )
);