import { Tooltip, Avatar } from '@mantine/core';
import React from 'react';

import { User } from 'types';
import { getInitials } from 'utils/getInitials';

type ProjectMembersProps = {
  large?: boolean;
  members: User<string>[];
};

function ProjectMembers({ large, members }: ProjectMembersProps) {
  return (
    <Tooltip.Group>
      <Avatar.Group spacing="sm" my={5}>
        {members.map((member) => (
          <Tooltip
            key={member._id}
            label={`${member.firstName} ${member.lastName}`}
            withArrow
          >
            <Avatar size={large ? 44 : 'md'} radius="xl" color="violet.7">
              {getInitials(member.firstName, member.lastName)}
            </Avatar>
          </Tooltip>
        ))}
      </Avatar.Group>
    </Tooltip.Group>
  );
}

export default ProjectMembers;
