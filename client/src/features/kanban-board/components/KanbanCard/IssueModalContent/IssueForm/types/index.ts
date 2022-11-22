export interface FormValues {
  title: string;
  description: string | null;
  type: string;
  status: string;
  priority: string;
  assignee: string | null;
  reporter: string;
  dueDate: Date | null;
}
