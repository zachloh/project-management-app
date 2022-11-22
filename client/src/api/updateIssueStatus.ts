import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Issue, Project } from 'types';

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

const updateIssueStatus = ({
  issueId,
  source,
  destination,
  destinationIndex,
}: UpdateIssueData): Promise<Issue> =>
  customAxios.patch(`/issues/${issueId}/status`, {
    source,
    destination,
    destinationIndex,
  });

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

    onError: (_, __, context) => {
      // TODO: Add a toast
      queryClient.setQueryData(
        ['projects', projectId],
        context?.previousProjectData
      );
    },

    onSettled: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({
        queryKey: ['projects', projectId],
      });
    },
  });
};
