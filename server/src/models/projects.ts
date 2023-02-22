import { Schema, model, Types } from 'mongoose';

import Issue from './issues';
import User from './users';

export interface IProject {
  name: string;
  members: Types.ObjectId[];
  description: string;
  category: 'business' | 'marketing' | 'software';
  todoIssues: Types.ObjectId[];
  inReviewIssues: Types.ObjectId[];
  inProgressIssues: Types.ObjectId[];
  completedIssues: Types.ObjectId[];
  expireAt?: Date;
}

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  members: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
      },
    ],
    validate: {
      validator(array: Types.ObjectId[]) {
        return array.length > 0;
      },
      message: () => 'members should not be empty',
    },
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    enum: ['business', 'marketing', 'software'],
  },
  todoIssues: [
    {
      type: Schema.Types.ObjectId,
      ref: Issue,
    },
  ],
  inReviewIssues: [
    {
      type: Schema.Types.ObjectId,
      ref: Issue,
    },
  ],
  inProgressIssues: [
    {
      type: Schema.Types.ObjectId,
      ref: Issue,
    },
  ],
  completedIssues: [
    {
      type: Schema.Types.ObjectId,
      ref: Issue,
    },
  ],
  expireAt: {
    type: Date,
    expires: 0,
  },
});

const Project = model<IProject>('Project', projectSchema);

export default Project;
