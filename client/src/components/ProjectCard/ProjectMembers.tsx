import { Tooltip, Avatar } from '@mantine/core';
import React from 'react';

import { User } from 'types';

type ProjectMembersProps = {
  members: User[];
};

function ProjectMembers({ members }: ProjectMembersProps) {
  return (
    <Tooltip.Group>
      <Avatar.Group spacing="sm">
        {members.map((member) => (
          <Tooltip key={member._id} label={member.name} withArrow>
            <Avatar radius="xl" color="indigo" />
          </Tooltip>
        ))}
      </Avatar.Group>
    </Tooltip.Group>
  );
}

export default ProjectMembers;
