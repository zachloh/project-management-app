import { Card, Badge, Divider, Stack, Group } from '@mantine/core';
import React from 'react';

import { Project, PopulatedIssue } from 'types';

import ProjectDescription from './ProjectDescription';
import ProjectMembers from './ProjectMembers';
import ProjectProgress from './ProjectProgress';
import ProjectTitle from './ProjectTitle';

type ProjectCardProps = {
  large?: boolean;
  project: Project<PopulatedIssue>;
};

function ProjectCard({ large, project }: ProjectCardProps) {
  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Stack spacing={0} h="100%">
        <ProjectTitle
          large={large}
          title={project.name}
          projectId={project._id}
        />
        <ProjectMembers large={large} members={project.members} />
        <ProjectDescription large={large} description={project.description} />
        <Group position="left">
          <Badge color="violet.7" size="lg" mt="auto">
            {project.category}
          </Badge>
        </Group>
        <Divider my="md" />
        <ProjectProgress project={project} />
      </Stack>
    </Card>
  );
}

export default ProjectCard;
