import { useInfiniteQuery } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { ProjectHistory } from 'types';

type GetProjectHistoryResponse = {
  nextPage?: number;
  data: ProjectHistory[];
};

const getProjectHistory = async ({
  projectId,
  pageParam = 1,
}: {
  projectId: string | undefined;
  pageParam: GetProjectHistoryResponse['nextPage'];
}): Promise<GetProjectHistoryResponse> => {
  if (typeof projectId === 'undefined') {
    return Promise.reject(new Error('Invalid projectId'));
  }

  const { data } = await customAxios.get<GetProjectHistoryResponse>(
    `/projects/${projectId}/history?page=${pageParam}`
  );

  return data;
};

export const useGetProjectHistory = (projectId: string | undefined) =>
  useInfiniteQuery({
    queryKey: ['projects', 'history', projectId],
    queryFn: ({
      pageParam = 1,
    }: {
      pageParam?: GetProjectHistoryResponse['nextPage'];
    }) => getProjectHistory({ pageParam, projectId }),
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
  });
