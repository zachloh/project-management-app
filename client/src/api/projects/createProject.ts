import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Project, User } from 'types';

type CreateProjectData = {
  name: string;
  orgId: string | undefined;
  userId: string;
  description: string;
  category: 'business' | 'marketing' | 'software';
};

const createProject = async (
  projectData: CreateProjectData
): Promise<Project> => {
  if (typeof projectData.orgId === 'undefined') {
    return Promise.reject(new Error('Invalid orgId'));
  }

  const { data } = await customAxios.post<Project>('projects', projectData);
  return data;
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      queryClient.setQueryData(['projects', data._id], data);
      queryClient.setQueryData<User>(['auth-user'], (old) => {
        if (old) {
          return {
            ...old,
            completedWelcome: true,
          };
        }
        return old;
      });
    },
  });
};
