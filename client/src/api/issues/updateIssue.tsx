/* eslint-disable @typescript-eslint/no-floating-promises */
import { showNotification } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import React from 'react';
import { Check, ExclamationMark } from 'tabler-icons-react';

import { customAxios } from 'lib/axios';
import { Issue } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';
import storage from 'utils/storage';

type IssueData = {
  type: 'task' | 'story' | 'bug';
  priority: 'low' | 'medium' | 'high';
  status: 'to do' | 'in progress' | 'in review' | 'done';
  title: string;
  description: string | undefined;
  reporter: string;
  assignee: string | undefined;
  dueDate: Date | undefined;
  updatedFields: string[];
};

type Payload = JwtPayload & {
  _id: string;
};

const updateIssue = async ({
  issueId,
  issueData,
}: {
  issueId: string;
  issueData: IssueData;
}): Promise<Issue> => {
  const token = storage.getToken();
  if (!token) {
    return Promise.reject(new Error('No token found'));
  }

  const decoded = jwt_decode<Payload>(token);
  const userId = decoded._id;

  const { data } = await customAxios.patch<Issue>(`/issues/${issueId}`, {
    ...issueData,
    userId,
  });
  return data;
};

export const useUpdateIssue = (orgId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIssue,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['issues', variables.issueId], data);
      queryClient.invalidateQueries({
        queryKey: ['projects', data.project],
      });

      showNotification({
        title: 'Success',
        message: `Updated: ${data.title}`,
        color: 'teal',
        icon: <Check />,
      });

      if (orgId) {
        queryClient.invalidateQueries({
          queryKey: ['org', orgId, 'issues'],
        });
      }
    },
    onError: (err) => {
      showNotification({
        title: 'Error',
        message: 'Update failed. Please try again.',
        color: 'red',
        icon: <ExclamationMark />,
      });

      refetchUserOnError(err, queryClient);
    },
  });
};
