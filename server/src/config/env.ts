import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: process.env.PORT || 3000,
  mongo: {
    username: process.env.MONGO_USERNAME as string,
    password: process.env.MONGO_PASSWORD as string,
  },
  token: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET as string,
    expireTime: process.env.TOKEN_EXPIRE_TIME as string,
  },
  demoData: {
    password: process.env.DEMO_PASSWORD as string,
  },
};

export default env;
