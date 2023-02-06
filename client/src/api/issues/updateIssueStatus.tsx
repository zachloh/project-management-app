/* eslint-disable @typescript-eslint/no-floating-promises */
import { showNotification } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import React from 'react';
import { ExclamationMark } from 'tabler-icons-react';

import { customAxios } from 'lib/axios';
import { Issue, Project } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';
import storage from 'utils/storage';

export type SourceOrDestination =
  | 'todoIssues'
  | 'inProgressIssues'
  | 'inReviewIssues'
  | 'completedIssues';

type UpdateIssueData = {
  issueId: string;
  source: SourceOrDestination;
  sourceIndex: number;
  destination: SourceOrDestination;
  destinationIndex: number;
};

type Payload = JwtPayload & {
  _id: string;
};

const updateIssueStatus = async ({
  issueId,
  source,
  destination,
  destinationIndex,
}: UpdateIssueData): Promise<Issue> => {
  const token = storage.getToken();
  if (!token) {
    return Promise.reject(new Error('No token found'));
  }

  const decoded = jwt_decode<Payload>(token);
  const userId = decoded._id;

  const { data } = await customAxios.patch<Issue>(`/issues/${issueId}/status`, {
    source,
    destination,
    destinationIndex,
    userId,
  });
  return data;
};

export const useUpdateIssueStatus = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIssueStatus,
    onMutate: async ({
      source,
      sourceIndex,
      destination,
      destinationIndex,
    }) => {
      await queryClient.cancelQueries({
        queryKey: ['projects', projectId],
      });

      const previousProjectData = queryClient.getQueryData<Project>([
        'projects',
        projectId,
      ]);

      queryClient.setQueryData<Project>(['projects', projectId], (old) => {
        if (old) {
          if (source === destination) {
            const copiedIssues = [...old[source]];
            const updatedIssue = copiedIssues[sourceIndex];
            copiedIssues.splice(sourceIndex, 1);
            copiedIssues.splice(destinationIndex, 0, updatedIssue);
            return {
              ...old,
              [source]: copiedIssues,
            };
          }

          const copiedSourceIssues = [...old[source]];
          const copiedDestinationIssues = [...old[destination]];
          const updatedIssue = copiedSourceIssues[sourceIndex];
          copiedSourceIssues.splice(sourceIndex, 1);
          copiedDestinationIssues.splice(destinationIndex, 0, updatedIssue);
          return {
            ...old,
            [source]: copiedSourceIssues,
            [destination]: copiedDestinationIssues,
          };
        }

        return old;
      });

      return { previousProjectData };
    },

    onSuccess: (data, variables) => {
      queryClient.setQueryData(['issues', variables.issueId], data);
    },

    onError: (err, __, context) => {
      queryClient.setQueryData(
        ['projects', projectId],
        context?.previousProjectData
      );
      showNotification({
        title: 'Error',
        message: 'Update failed. Please try again later.',
        color: 'red',
        icon: <ExclamationMark />,
      });

      refetchUserOnError(err, queryClient);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', projectId],
      });
    },
  });
};
