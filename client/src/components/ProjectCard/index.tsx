import { Card, Badge, Divider } from '@mantine/core';
import React from 'react';

import { Project } from 'types';

import ProjectDescription from './ProjectDescription';
import ProjectMembers from './ProjectMembers';
import ProjectProgress from './ProjectProgress';
import ProjectTitle from './ProjectTitle';

type ProjectCardProps = {
  large?: boolean;
  project: Project;
};

function ProjectCard({ large, project }: ProjectCardProps) {
  return (
    <Card shadow="sm" p="sm" radius="md" withBorder>
      <ProjectTitle title={project.name} />
      <ProjectMembers members={project.members} />
      <ProjectDescription large={large} description={project.description} />
      <Badge color="violet" size="lg">
        {project.category}
      </Badge>
      <Divider my="md" />
      <ProjectProgress project={project} />
    </Card>
  );
}

export default ProjectCard;
