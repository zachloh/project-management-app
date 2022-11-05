import { Card, Badge, Divider } from '@mantine/core';
import React from 'react';

import ProjectDescription from './ProjectDescription';
import ProjectMembers from './ProjectMembers';
import ProjectProgress from './ProjectProgress';
import ProjectTitle from './ProjectTitle';

type ProjectCardProps = {
  large?: boolean;
};

function ProjectCard({ large }: ProjectCardProps) {
  return (
    <Card shadow="sm" p="sm" radius="md" withBorder>
      <ProjectTitle />
      <ProjectMembers />
      <ProjectDescription large={large} />
      <Badge color="violet" size="lg">
        Software
      </Badge>
      <Divider my="md" />
      <ProjectProgress />
    </Card>
  );
}

export default ProjectCard;
