import { Schema, model, Types } from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'admin' | 'project manager' | 'member';
  position?: string;
  org?: Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      enum: ['admin', 'project manager', 'member'],
    },
    position: {
      type: String,
      trim: true,
    },
    org: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);

export default User;
