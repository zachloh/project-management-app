import { Schema, model, Types } from 'mongoose';

interface IIssue {
  project: Types.ObjectId;
  type: string;
  priority: string;
  status: string;
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
    },
    priority: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
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
