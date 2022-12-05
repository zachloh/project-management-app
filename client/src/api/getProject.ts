import { useQuery } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Project } from 'types';

const getProject = async (
  projectId: string | undefined,
  signal: AbortSignal | undefined
): Promise<Project> => {
  if (!projectId) throw new Error();
  const { data } = await customAxios.get<Project>(`/projects/${projectId}`, {
    signal,
  });
  return data;
};

export const useGetProject = (projectId: string | undefined) =>
  useQuery({
    queryKey: ['projects', projectId],
    queryFn: ({ signal }) => getProject(projectId, signal),
  });
