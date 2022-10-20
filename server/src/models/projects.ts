import { Schema, model, Types } from 'mongoose';

interface IProject {
  name: string;
  members: Types.ObjectId[];
  projectIconURL: string;
  description: string;
  category: string;
  todoIssues: Types.ObjectId[];
  inReviewIssues: Types.ObjectId[];
  inProgressIssues: Types.ObjectId[];
  completedIssues: Types.ObjectId[];
}

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  members: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
  projectIconURL: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  todoIssues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Issue',
    },
  ],
  inReviewIssues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Issue',
    },
  ],
  inProgressIssues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Issue',
    },
  ],
  completedIssues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Issue',
    },
  ],
});

const Project = model<IProject>('Project', projectSchema);

export default Project;
