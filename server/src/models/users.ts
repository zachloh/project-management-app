import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = model<IUser>('User', userSchema);

export default User;
