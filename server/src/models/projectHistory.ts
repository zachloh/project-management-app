import { model, Schema, Types } from 'mongoose';

export interface History {
  issueId: Types.ObjectId;
  issueTitle: string;
  user: Types.ObjectId;
  mutation: 'create' | 'update' | 'delete';
  updatedFields?: string[];
  date: Date;
  isDeleted: boolean;
}

export interface IProjectHistory {
  projectId: Types.ObjectId;
  history: History[];
  expireAt?: Date;
}

const projectHistorySchema = new Schema<IProjectHistory>({
  projectId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  history: [
    {
      issueId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Issue',
      },
      issueTitle: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      mutation: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: ['create', 'update', 'delete'],
      },
      updatedFields: [
        {
          type: String,
          trim: true,
          enum: [
            'type',
            'priority',
            'status',
            'title',
            'description',
            'reporter',
            'assignee',
            'dueDate',
          ],
        },
      ],
      date: {
        type: Date,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  expireAt: {
    type: Date,
    expires: 0,
  },
});

const ProjectHistory = model<IProjectHistory>(
  'ProjectHistory',
  projectHistorySchema
);

export default ProjectHistory;
