import { useQuery } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Issue } from 'types';

const getIssue = async (issueId: string): Promise<Issue> => {
  const { data } = await customAxios.get<Issue>(`/issues/${issueId}`);
  return data;
};

export const useGetIssue = (issueId: string) =>
  useQuery({
    queryKey: ['issues', issueId],
    queryFn: () => getIssue(issueId),
  });
