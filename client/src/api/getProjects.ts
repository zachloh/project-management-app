import { useQuery } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Project } from 'types';

type GetProjectsResponse = {
  projects: Project[];
  createdIssuesLast7Days: number[];
  completedIssuesLast7Days: number[];
};

const getProjects = async (orgId: string): Promise<GetProjectsResponse> => {
  const { data } = await customAxios.get<GetProjectsResponse>(
    `/org/${orgId}/projects`
  );
  return data;
};

export const useGetProjects = (orgId: string) =>
  useQuery({
    queryKey: ['org', orgId, 'projects'],
    queryFn: () => getProjects(orgId),
  });
