/* eslint-disable @typescript-eslint/no-floating-promises */
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Project } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';

import { GetProjectsResponse } from './getProjects';

const deleteProject = async ({
  projectId,
  orgId,
}: {
  projectId: string;
  orgId: string | undefined;
}): Promise<Project<string, string>> => {
  if (typeof orgId === 'undefined') {
    return Promise.reject(new Error('Invalid orgId'));
  }

  const { data } = await customAxios.delete<Project<string, string>>(
    `/projects/${projectId}?orgId=${orgId}`
  );
  return data;
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: (_, variables) => {
      if (variables.orgId) {
        queryClient.setQueryData<GetProjectsResponse>(
          ['org', variables.orgId, 'projects'],
          (old) => {
            if (old) {
              const newProjects = old.projects.filter(
                (project) => project._id !== variables.projectId
              );

              return {
                ...old,
                projects: newProjects,
              };
            }
            return old;
          }
        );

        queryClient.invalidateQueries({
          queryKey: ['org', variables.orgId, 'issues'],
        });
      }

      queryClient.removeQueries({
        queryKey: ['projects', variables.projectId],
        exact: true,
      });
    },
    onError: (err) => {
      refetchUserOnError(err, queryClient);
    },
  });
};
