/* eslint-disable @typescript-eslint/no-floating-promises */
import { showNotification } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Check, ExclamationMark } from 'tabler-icons-react';

import { customAxios } from 'lib/axios';
import { Issue, Project } from 'types';

type CreateIssueData = {
  project: string;
  title: string;
  type: 'task' | 'story' | 'bug';
  priority: 'low' | 'medium' | 'high';
  status: 'to do' | 'in progress' | 'in review' | 'done';
  reporter: string;
};

const createIssue = async (issueData: CreateIssueData): Promise<Issue> => {
  const { data } = await customAxios.post<Issue>('/issues', issueData);
  return data;
};

type ProjectIssues = keyof Pick<
  Project,
  'todoIssues' | 'inProgressIssues' | 'inReviewIssues' | 'completedIssues'
>;

const projectIssues: Record<Issue['status'], ProjectIssues> = {
  'to do': 'todoIssues',
  'in progress': 'inProgressIssues',
  'in review': 'inReviewIssues',
  done: 'completedIssues',
};

export const useCreateIssue = (successCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIssue,
    onSuccess: (data, variables) => {
      queryClient.setQueryData<Project>(
        ['projects', variables.project],
        (old) => {
          if (old) {
            const copiedIssues = [...old[projectIssues[variables.status]]];

            return {
              ...old,
              [projectIssues[variables.status]]: [...copiedIssues, data],
            };
          }

          return old;
        }
      );

      if (successCallback) {
        successCallback();
      }

      showNotification({
        title: 'Success',
        message: `Created: ${data.title}`,
        color: 'teal',
        icon: <Check />,
      });
    },
    onError: () => {
      showNotification({
        title: 'Error',
        message: 'Failed to create issue. Please try again later.',
        color: 'red',
        icon: <ExclamationMark />,
      });
    },
  });
};
