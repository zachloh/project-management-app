import mongoose from 'mongoose';

import env from 'config/env';

const connectDB = async () => {
  const { uri } = env.mongo;

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
