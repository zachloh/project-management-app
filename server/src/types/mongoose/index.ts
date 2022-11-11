interface PopulatedMembers {
  _id: string;
  name: string;
  iconURL: string;
}

export interface PopulatedIssue {
  _id: string;
  createdAt: Date;
}

export interface PopulatedProject {
  name: string;
  members: PopulatedMembers[];
  projectIconURL: string;
  description: string;
  category: string;
  todoIssues: PopulatedIssue[];
  inReviewIssues: PopulatedIssue[];
  inProgressIssues: PopulatedIssue[];
  completedIssues: PopulatedIssue[];
}
