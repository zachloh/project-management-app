import { useQuery } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Project } from 'types';

const getProject = async (
  projectId: string,
  signal: AbortSignal | undefined
): Promise<Project> => {
  const { data } = await customAxios.get<Project>(`/projects/${projectId}`, {
    signal,
  });
  return data;
};

export const useGetProject = (projectId: string) =>
  useQuery({
    queryKey: ['projects', projectId],
    queryFn: ({ signal }) => getProject(projectId, signal),
  });
