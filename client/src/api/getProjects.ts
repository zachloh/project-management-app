import { useQuery } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Project, PopulatedIssue } from 'types';

type GetProjectsResponse = {
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

export const useGetProjects = (orgId: string | undefined) =>
  useQuery({
    queryKey: ['org', orgId, 'projects'],
    queryFn: () => getProjects(orgId),
    enabled: !!orgId,
  });
