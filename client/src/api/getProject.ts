import { useQuery } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Project } from 'types';

const getProject = async (projectId: string): Promise<Project> => {
  const { data } = await customAxios.get<Project>(`/projects/${projectId}`);
  return data;
};

export const useGetProject = (projectId: string) =>
  // TODO: get orgId instead of hardcoding
  useQuery({
    queryKey: ['org', '636a10bb1fb9e7a0550389f2', 'projects', projectId],
    queryFn: () => getProject(projectId),
  });