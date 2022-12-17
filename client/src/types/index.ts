export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: 'admin' | 'project manager' | 'member';
  position?: string;
  org?: string;
  createdAt: string;
  updatedAt: string;
};

export type Issue = {
  _id: string;
  project: string;
  type: 'task' | 'story' | 'bug';
  priority: 'low' | 'medium' | 'high';
  status: 'to do' | 'in progress' | 'in review' | 'done';
  title: string;
  description?: string;
  reporter: string;
  assignee?: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type PopulatedIssue = {
  _id: string;
  createdAt: string;
  completedAt?: string;
};

export type Project<T = Issue> = {
  _id: string;
  name: string;
  members: User[];
  description: string;
  category: string;
  todoIssues: T[];
  inReviewIssues: T[];
  inProgressIssues: T[];
  completedIssues: T[];
};
