export type Member = {
  _id: string;
  name: string;
  iconURL: string;
};

type Issue = {
  _id: string;
  createdAt: string;
};

export type Project = {
  _id: string;
  name: string;
  members: Member[];
  projectIconURL: string;
  description: string;
  category: string;
  todoIssues: Issue[];
  inReviewIssues: Issue[];
  inProgressIssues: Issue[];
  completedIssues: Issue[];
};

export type ProjectResponse = {
  projects: Project[];
  createdIssuesLast7Days: number[];
  completedIssuesLast7Days: number[];
};
