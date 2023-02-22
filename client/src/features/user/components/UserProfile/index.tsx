import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Group,
  Text,
  Tooltip,
} from '@mantine/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout, Pencil } from 'tabler-icons-react';

import { useAuth } from 'api/auth';
import { User } from 'types';
import { getInitials } from 'utils/getInitials';

import EditProfileModal from './EditProfileModal';

type UserProfileProps = {
  user: User;
};

function UserProfile({ user }: UserProfileProps) {
  const [opened, setOpened] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <Box px={12}>
        <Center>
          <Avatar radius="xl" color="violet.7" mb={5}>
            {getInitials(user.firstName, user.lastName)}
          </Avatar>
        </Center>
        <Text weight={700} align="center" truncate>
          {`${user.firstName} ${user.lastName}`}
        </Text>
        <Text color="#767676" align="center" truncate>
          {user.isDemo ? 'guest@gmail.com' : user.email}
        </Text>
        <Group my={10} position="center">
          <Tooltip label="Edit Profile" withArrow position="left">
            <ActionIcon
              variant="default"
              size={35}
              p={5}
              onClick={() => setOpened(true)}
              aria-label="Edit profile"
            >
              <Pencil />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Sign Out" withArrow position="right">
            <ActionIcon
              variant="default"
              size={35}
              p={5}
              onClick={() => {
                logout();
                navigate('/login');
              }}
              aria-label="Sign out"
            >
              <Logout />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Box>
      <EditProfileModal
        opened={opened}
        onClose={() => setOpened(false)}
        user={user}
      />
    </>
  );
}

export default UserProfile;
