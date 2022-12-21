export type WelcomeFormValues = {
  organization: string;
  position: string;
  role: 'admin' | 'project manager' | 'member';
  name: string;
  description: string;
  category: 'business' | 'marketing' | 'software';
};
