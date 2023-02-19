import { useQuery, useQueryClient } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Project } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';

const getProject = async (
  projectId: string | undefined,
  userId: string,
  signal: AbortSignal | undefined
): Promise<Project> => {
  if (typeof projectId === 'undefined') {
    return Promise.reject(new Error('Invalid projectId'));
  }
  const { data } = await customAxios.get<Project>(
    `/projects/${projectId}?userId=${userId}`,
    {
      signal,
    }
  );
  return data;
};

export const useGetProject = (
  projectId: string | undefined,
  userId: string
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['projects', projectId],
    queryFn: ({ signal }) => getProject(projectId, userId, signal),
    onError: (err) => {
      refetchUserOnError(err, queryClient);
    },
  });
};
