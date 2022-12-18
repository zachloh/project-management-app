import { Types } from 'mongoose';

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
}

export interface PopulatedIssue {
  _id: Types.ObjectId;
  createdAt: Date;
  completedAt?: Date;
}

export interface PopulatedProject {
  name: string;
  members: PopulatedMembers[];
  description: string;
  category: string;
  todoIssues: PopulatedIssue[];
  inReviewIssues: PopulatedIssue[];
  inProgressIssues: PopulatedIssue[];
  completedIssues: PopulatedIssue[];
}
