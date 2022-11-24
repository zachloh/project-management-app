interface PopulatedMembers {
  _id: string;
  name: string;
}

export interface PopulatedIssue {
  _id: string;
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
