import { useQuery, useQueryClient } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Project, PopulatedIssue } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';

export type GetProjectsResponse = {
  projects: Project<PopulatedIssue>[];
  createdIssuesLast7Days: number[];
  completedIssuesLast7Days: number[];
};

const getProjects = async (
  orgId: string | undefined
): Promise<GetProjectsResponse> => {
  if (typeof orgId === 'undefined') {
    return Promise.reject(new Error('Invalid orgId'));
  }

  const { data } = await customAxios.get<GetProjectsResponse>(
    `/org/${orgId}/projects`
  );
  return data;
};

export const useGetProjects = (orgId: string | undefined) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['org', orgId, 'projects'],
    queryFn: () => getProjects(orgId),
    onError: (err) => {
      refetchUserOnError(err, queryClient);
    },
  });
};
