import { Schema, model, Types } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'admin' | 'project manager' | 'member';
  position?: string;
  org?: Types.ObjectId;
  completedWelcome: boolean;
  isDemo?: boolean;
  expireAt?: Date;
  createdAt?: Date;
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
      lowercase: true,
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
      lowercase: true,
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
    completedWelcome: {
      type: Boolean,
      default: false,
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
    expireAt: {
      type: Date,
      expires: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);

export default User;
