import { RequestHandler } from 'express';
import passport from 'passport';

export const verifyToken = () =>
  passport.authenticate('jwt', { session: false }) as RequestHandler;
