import { Schema, model, Types } from 'mongoose';

export interface IIssue {
  project: Types.ObjectId;
  type: 'task' | 'story' | 'bug';
  priority: 'low' | 'medium' | 'high';
  status: 'to do' | 'in progress' | 'in review' | 'done';
  title: string;
  description?: string;
  reporter: Types.ObjectId;
  assignee?: Types.ObjectId;
  dueDate?: Date;
  completedAt?: Date;
}

const issueSchema = new Schema<IIssue>(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ['task', 'story', 'bug'],
    },
    priority: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ['low', 'medium', 'high'],
    },
    status: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ['to do', 'in progress', 'in review', 'done'],
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    description: {
      type: String,
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    dueDate: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Issue = model<IIssue>('Issue', issueSchema);

export default Issue;
