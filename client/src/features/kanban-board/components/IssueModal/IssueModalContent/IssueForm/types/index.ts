export interface FormValues {
  title: string;
  description: string;
  type: 'task' | 'story' | 'bug';
  status: 'to do' | 'in progress' | 'in review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string | null;
  reporter: string;
  dueDate: Date | null;
}
