import { useQuery, useQueryClient } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Issue } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';

export type SearchedIssue = {
  _id: string;
  type: Issue['type'];
  title: Issue['title'];
  project: Issue['project'];
};

const getAllIssues = async (
  orgId: string | undefined,
  userId: string
): Promise<SearchedIssue[]> => {
  if (typeof orgId === 'undefined') {
    return Promise.reject(new Error('Invalid orgId'));
  }

  const { data } = await customAxios.get<SearchedIssue[]>(
    `/issues?orgId=${orgId}&userId=${userId}`
  );
  return data;
};

export const useGetAllIssues = (orgId: string | undefined, userId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['org', orgId, 'issues'],
    queryFn: () => getAllIssues(orgId, userId),
    onError: (err) => {
      refetchUserOnError(err, queryClient);
    },
  });
};
