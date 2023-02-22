export type PopulatedOrganization = {
  _id: string;
  name: string;
  members: string[];
  projects: string[];
  createdAt: string;
  updatedAt: string;
};

export type User<T = PopulatedOrganization> = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: 'admin' | 'project manager' | 'member';
  position?: string;
  org?: T;
  createdAt: string;
  updatedAt: string;
  completedWelcome: boolean;
  isDemo?: boolean;
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

export type Project<T = Issue, U = User<string>> = {
  _id: string;
  name: string;
  members: U[];
  description: string;
  category: 'business' | 'marketing' | 'software';
  todoIssues: T[];
  inReviewIssues: T[];
  inProgressIssues: T[];
  completedIssues: T[];
};

export type ProjectHistory = {
  _id: string;
  issueId: string;
  issueTitle: string;
  user: string;
  mutation: 'create' | 'update' | 'delete';
  updatedFields: string[];
  date: string;
  isDeleted: boolean;
};

export type Organization = {
  _id: string;
  name: string;
  members: User<string>[];
  projects: string[];
  createdAt: string;
  updatedAt: string;
};
