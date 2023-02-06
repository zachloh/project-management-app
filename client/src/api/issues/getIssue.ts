import { useQuery, useQueryClient } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Issue } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';

const getIssue = async (issueId: string): Promise<Issue> => {
  const { data } = await customAxios.get<Issue>(`/issues/${issueId}`);
  return data;
};

export const useGetIssue = (issueId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['issues', issueId],
    queryFn: () => getIssue(issueId),
    onError: (err) => {
      refetchUserOnError(err, queryClient);
    },
  });
};
