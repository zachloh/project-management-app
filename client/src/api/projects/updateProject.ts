import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { Project } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';

import { GetProjectsResponse } from './getProjects';

type ProjectData = {
  name: string;
  description: string;
  category: Project['category'];
};

const updateProject = async ({
  projectId,
  projectData,
}: {
  projectId: string;
  projectData: ProjectData;
}): Promise<Project> => {
  const { data } = await customAxios.patch<Project>(
    `/projects/${projectId}`,
    projectData
  );
  return data;
};

export const useUpdateProject = (orgId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: (data, variables) => {
      if (orgId) {
        queryClient.setQueryData<GetProjectsResponse>(
          ['org', orgId, 'projects'],
          (old) => {
            if (old) {
              const newProjects = old.projects.map((project) => {
                if (project._id === variables.projectId) {
                  return {
                    ...project,
                    ...variables.projectData,
                  };
                }
                return project;
              });

              return {
                ...old,
                projects: newProjects,
              };
            }
            return old;
          }
        );
      }

      queryClient.setQueryData(['projects', variables.projectId], data);
    },
    onError: (err) => {
      refetchUserOnError(err, queryClient);
    },
  });
};
