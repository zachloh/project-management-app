import cors from 'cors';
import express from 'express';
import 'module-alias/register';
import passport from 'passport';

import connectDB from 'config/database';
import env from 'config/env';
import { jwtStrategy } from 'lib/passport';
import { verifyToken } from 'middleware/verifyToken';
import issueRoutes from 'routes/issues';
import projectRoutes from 'routes/projects';
import userRoutes from 'routes/users';

const initializeServer = async () => {
  passport.use(jwtStrategy);

  const app = express();

  app.use(express.json());
  // TODO: Set allow origin
  app.use(cors());

  await connectDB();

  app.use('/api/users', userRoutes);
  app.use(
    '/api/org/:orgId/projects',
    verifyToken(),
    (req, res, next) => {
      req.orgId = req.params.orgId;
      next();
    },
    projectRoutes
  );
  app.use('/api/projects', verifyToken(), projectRoutes);
  app.use('/api/issues', verifyToken(), issueRoutes);

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
