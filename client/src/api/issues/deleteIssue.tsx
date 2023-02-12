/* eslint-disable @typescript-eslint/no-floating-promises */
import { showNotification } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import React from 'react';
import { Check, ExclamationMark } from 'tabler-icons-react';

import { customAxios } from 'lib/axios';
import { Issue, Project } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';
import storage from 'utils/storage';

type ProjectIssues = keyof Pick<
  Project,
  'todoIssues' | 'inProgressIssues' | 'inReviewIssues' | 'completedIssues'
>;

type Payload = JwtPayload & {
  _id: string;
};

const mapIssueStatus: Record<Issue['status'], ProjectIssues> = {
  'to do': 'todoIssues',
  'in progress': 'inProgressIssues',
  'in review': 'inReviewIssues',
  done: 'completedIssues',
};

const deleteIssue = async (issue: Issue): Promise<Issue> => {
  const token = storage.getToken();
  if (!token) {
    return Promise.reject(new Error('No token found'));
  }

  const decoded = jwt_decode<Payload>(token);
  const userId = decoded._id;
  const { data } = await customAxios.delete<Issue>(
    `/issues/${issue._id}?userId=${userId}`
  );
  return data;
};

export const useDeleteIssue = (orgId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteIssue,
    onMutate: async (issue) => {
      await queryClient.cancelQueries({
        queryKey: ['projects', issue.project],
      });

      const previousProjectData = queryClient.getQueryData<Project>([
        'projects',
        issue.project,
      ]);

      queryClient.setQueryData<Project>(['projects', issue.project], (old) => {
        if (old) {
          const copiedIssues = [...old[mapIssueStatus[issue.status]]];
          const updatedIssues = copiedIssues.filter(
            (oldIssue) => oldIssue._id !== issue._id
          );

          return {
            ...old,
            [mapIssueStatus[issue.status]]: updatedIssues,
          };
        }

        return old;
      });

      return { previousProjectData };
    },
    onSuccess: (_, issue) => {
      showNotification({
        title: 'Success',
        message: `Deleted: ${issue.title}`,
        color: 'teal',
        icon: <Check />,
      });

      queryClient.removeQueries({
        queryKey: ['issues', issue._id],
        exact: true,
      });

      if (orgId) {
        queryClient.invalidateQueries({
          queryKey: ['org', orgId, 'issues'],
        });
      }
    },
    onError: (err, issue, context) => {
      queryClient.setQueryData(
        ['projects', issue.project],
        context?.previousProjectData
      );

      showNotification({
        title: 'Error',
        message: 'Delete failed. Please try again later.',
        color: 'red',
        icon: <ExclamationMark />,
      });

      refetchUserOnError(err, queryClient);
    },
    onSettled: (_, __, issue) => {
      queryClient.invalidateQueries({
        queryKey: ['projects', issue.project],
      });
    },
  });
};
