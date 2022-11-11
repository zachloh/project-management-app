import { useQuery } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';

import { ProjectResponse } from '../types';

const getProjects = async (orgId: string): Promise<ProjectResponse> => {
  const { data } = await customAxios.get<ProjectResponse>(
    `/org/${orgId}/projects`
  );
  return data;
};

export const useProjects = (orgId: string) =>
  useQuery({
    queryKey: ['org', orgId, 'projects'],
    queryFn: () => getProjects(orgId),
  });
