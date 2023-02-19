import { Types } from 'mongoose';

import { IIssue } from 'models/issues';

interface PopulatedMembers {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  role?: 'admin' | 'project manager' | 'member';
  position?: string;
  org?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  completedWelcome: boolean;
}

export interface PopulatedIssue extends IIssue {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface PopulatedProject {
  _id: Types.ObjectId;
  name: string;
  members: PopulatedMembers[];
  description: string;
  category: string;
  todoIssues: PopulatedIssue[];
  inReviewIssues: PopulatedIssue[];
  inProgressIssues: PopulatedIssue[];
  completedIssues: PopulatedIssue[];
}
