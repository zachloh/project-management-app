import cors from 'cors';
import express from 'express';
import 'module-alias/register';

import connectDB from 'config/database';
import env from 'config/env';
import projectRoutes from 'routes/projects';

const initializeServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  await connectDB();

  app.use(
    '/api/org/:orgId/projects',
    (req, res, next) => {
      req.orgId = req.params.orgId;
      next();
    },
    projectRoutes
  );
  app.use('/api/projects', projectRoutes);

  // TODO: Error handling
  // const handleError: ErrorRequestHandler = (err, req, res, next) => {
  //   console.log(err);
  //   res.status(500).send('Server error!');
  // };
  // app.use(handleError);

  const { port } = env;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

initializeServer().catch(console.log);
