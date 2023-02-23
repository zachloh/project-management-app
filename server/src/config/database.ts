import mongoose from 'mongoose';

import env from 'config/env';

const connectDB = async () => {
  const { username, password } = env.mongo;
  const uri = `mongodb+srv://${username}:${password}@main-cluster.r7asynq.mongodb.net/project_hub?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
