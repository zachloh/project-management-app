import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import 'module-alias/register';
import passport from 'passport';

import connectDB from 'config/database';
import env from 'config/env';
import { jwtStrategy } from 'lib/passport';
import { errorHandler } from 'middleware/errorHandler';
import { verifyToken } from 'middleware/verifyToken';
import issueRoutes from 'routes/issues';
import organizationRoutes from 'routes/organizations';
import projectRoutes from 'routes/projects';
import userRoutes from 'routes/users';

const initializeServer = async () => {
  passport.use(jwtStrategy);

  const app = express();

  await connectDB();

  app.use(express.json());
  // TODO: Set allow origin
  app.use(
    cors({
      origin: env.cors.origin,
    })
  );
  app.use(helmet());
  app.use(compression());

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
  app.use('/api/organizations', verifyToken(), organizationRoutes);

  app.use(errorHandler);

  const { port } = env;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

initializeServer().catch(console.log);
