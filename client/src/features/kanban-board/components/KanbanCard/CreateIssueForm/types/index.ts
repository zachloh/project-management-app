import { Issue } from 'types';

export interface CreateIssueFormValues {
  title: string;
  type: Issue['type'];
  priority: Issue['priority'];
}
