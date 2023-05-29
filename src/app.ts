import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// Importing routes endpoints
import cseRoutes from './endpoints/cseRoute';
import chemRoutes from './endpoints/chemRoute';
import { redis } from './lib/redis';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Get all data from all models
app.get('/', async (req: Request, res: Response) => {
  try {
    const cachedData = await redis.get('allData');

    if (cachedData) {
      const allData = JSON.parse(cachedData);
      return res.json(allData);
    }

    const cseData = await prisma.cSE.findMany();
    const chemData = await prisma.chemistry.findMany();

    const allData = { cseData, chemData };

    await redis.set('allData', JSON.stringify(allData));

    res.json(allData);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'An error occurred while retrieving data.' });
  }
});

// Route endpoints
app.use('/cse', cseRoutes);
app.use('/chem', chemRoutes);

app.listen(process.env.PORT, () => {
  console.log(`listening at port ${process.env.PORT}`);
});
