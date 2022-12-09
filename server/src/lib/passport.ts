import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import env from 'config/env';
import User from 'models/users';

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.token.accessSecret,
  },
  (payload: { _id: string }, done) => {
    User.findOne({
      _id: payload._id,
    })
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => done(err, false));
  }
);
