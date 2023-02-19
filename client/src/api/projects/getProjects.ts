import { useQuery, useQueryClient } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Project } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';

export type GetProjectsResponse = {
  projects: Project[];
  createdIssuesLast7Days: number[];
  completedIssuesLast7Days: number[];
};

const getProjects = async (
  orgId: string | undefined,
  userId: string
): Promise<GetProjectsResponse> => {
  if (typeof orgId === 'undefined') {
    return Promise.reject(new Error('Invalid orgId'));
  }

  const { data } = await customAxios.get<GetProjectsResponse>(
    `/org/${orgId}/projects?userId=${userId}`
  );
  return data;
};

export const useGetProjects = (orgId: string | undefined, userId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['org', orgId, 'projects'],
    queryFn: async () => {
      const data = await getProjects(orgId, userId);

      data.projects.forEach((project) => {
        queryClient.setQueryData(['projects', project._id], project);
      });

      return data;
    },
    onError: (err) => {
      refetchUserOnError(err, queryClient);
    },
  });
};
