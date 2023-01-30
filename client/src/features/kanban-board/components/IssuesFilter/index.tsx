import {
  Avatar,
  Button,
  Divider,
  Group,
  MediaQuery,
  TextInput,
  Tooltip,
} from '@mantine/core';
import React from 'react';
import { Search } from 'tabler-icons-react';

import { User } from 'types';
import { getInitials } from 'utils/getInitials';

import styles from './IssuesFilter.module.css';

type IssuesFilterProps = {
  titleFilter: string;
  setTitleFilter: React.Dispatch<React.SetStateAction<string>>;
  filteredAssignees: string[];
  setFilteredAssignees: React.Dispatch<React.SetStateAction<string[]>>;
  members: User<string>[];
};

function IssuesFilter({
  titleFilter,
  setTitleFilter,
  filteredAssignees,
  setFilteredAssignees,
  members,
}: IssuesFilterProps) {
  const handleAvatarClick = (assigneeId: string) => {
    setFilteredAssignees((prevAssignees) => {
      const isActive = prevAssignees.some(
        (assignee) => assignee === assigneeId
      );

      if (isActive) {
        return prevAssignees.filter((assignee) => assignee !== assigneeId);
      }
      return [...prevAssignees, assigneeId];
    });
  };

  return (
    <Group mt={10} mb={30}>
      <MediaQuery smallerThan={426} styles={{ width: '100%' }}>
        <TextInput
          placeholder="Filter issues..."
          icon={<Search size={16} color="#373A40" />}
          aria-label="Filter issues"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          w={300}
        />
      </MediaQuery>
      <div>
        <Group>
          <Avatar.Group spacing={5}>
            {members.map((member) => (
              <Tooltip
                key={member._id}
                label={`${member.firstName} ${member.lastName}`}
                withArrow
                position="bottom"
                openDelay={300}
              >
                <Avatar
                  size="md"
                  radius="xl"
                  color="violet"
                  className={
                    filteredAssignees.includes(member._id)
                      ? `${styles.avatar} ${styles.active}`
                      : styles.avatar
                  }
                  onClick={() => handleAvatarClick(member._id)}
                >
                  {getInitials(member.firstName, member.lastName)}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
          <MediaQuery smallerThan={320} styles={{ display: 'none' }}>
            <Divider orientation="vertical" ml={6} />
          </MediaQuery>
          <Button
            variant="subtle"
            color="dark.3"
            onClick={() => {
              setTitleFilter('');
              setFilteredAssignees([]);
            }}
            styles={(theme) => ({
              root: {
                paddingLeft: 5,
                paddingRight: 5,
                fontSize: 16,
                '&:hover': {
                  backgroundColor: theme.colors.gray[2],
                },
              },
            })}
          >
            Clear filters
          </Button>
        </Group>
      </div>
    </Group>
  );
}

export default IssuesFilter;
