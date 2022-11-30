/* eslint-disable @typescript-eslint/no-floating-promises */
import { updateNotification, showNotification } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Check, ExclamationMark } from 'tabler-icons-react';

import { customAxios } from 'lib/axios';
import { Issue } from 'types';

type IssueData = {
  type: 'task' | 'story' | 'bug';
  priority: 'low' | 'medium' | 'high';
  status: 'to do' | 'in progress' | 'in review' | 'done';
  title: string;
  description: string | undefined;
  reporter: string;
  assignee: string | undefined;
  dueDate: Date | undefined;
};

const updateIssue = async ({
  issueId,
  issueData,
}: {
  issueId: string;
  issueData: IssueData;
}): Promise<Issue> => {
  const { data } = await customAxios.patch<Issue>(
    `/issues/${issueId}`,
    issueData
  );
  return data;
};

export const useUpdateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIssue,
    onMutate: ({ issueId, issueData }) => {
      showNotification({
        id: `update-issue-${issueId}`,
        title: 'Updating',
        message: issueData.title,
        loading: true,
        color: 'blue',
      });
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['issues', variables.issueId], data);
      queryClient.invalidateQueries({
        queryKey: ['projects', data.project],
      });

      updateNotification({
        id: `update-issue-${variables.issueId}`,
        title: 'Success',
        message: `Updated: ${data.title}`,
        color: 'teal',
        icon: <Check />,
      });
    },
    onError: (_, variables) => {
      updateNotification({
        id: `update-issue-${variables.issueId}`,
        title: 'Error',
        message: 'Update failed. Please try again later.',
        color: 'red',
        icon: <ExclamationMark />,
      });
    },
  });
};
