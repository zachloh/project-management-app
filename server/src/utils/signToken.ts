import jwt, { SignOptions } from 'jsonwebtoken';

import env from 'config/env';

export const signToken = (payload: { _id: string }, options?: SignOptions) =>
  jwt.sign(payload, env.token.accessSecret, {
    expiresIn: env.token.expireTime,
    ...options,
  });
