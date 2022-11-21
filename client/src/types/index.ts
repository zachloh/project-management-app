export type User = {
  _id: string;
  name: string;
  iconURL: string;
};

export type Issue = {
  _id: string;
  project: string;
  type: string;
  priority: string;
  status: string;
  title: string;
  description?: string;
  reporter: string;
  assignee?: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  _id: string;
  name: string;
  members: User[];
  projectIconURL: string;
  description: string;
  category: string;
  todoIssues: Issue[];
  inReviewIssues: Issue[];
  inProgressIssues: Issue[];
  completedIssues: Issue[];
};
