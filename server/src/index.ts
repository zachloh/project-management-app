import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'success' });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
