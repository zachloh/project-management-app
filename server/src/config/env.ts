import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: process.env.PORT || 3000,
  mongo: {
    username: process.env.MONGO_USERNAME as string,
    password: process.env.MONGO_PASSWORD as string,
  },
};

export default env;
