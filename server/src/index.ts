import cors from 'cors';
import express from 'express';
import 'module-alias/register';

import connectDB from 'config/database';
import env from 'config/env';

const initializeServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  await connectDB();

  const { port } = env;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

initializeServer().catch(console.log);
