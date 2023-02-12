import {
  NavLink,
  Navbar as MantineNavBar,
  ScrollArea,
  Divider,
  Skeleton,
  Group,
} from '@mantine/core';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Home,
  List,
  Subtask,
  FileSettings,
  Settings,
} from 'tabler-icons-react';

import { useGetProjects } from 'api/projects/getProjects';
import UserProfile from 'features/user/components/UserProfile';
import { User } from 'types';

type NavbarProps = {
  onClose: () => void;
  user: User;
};

function Navbar({ onClose, user }: NavbarProps) {
  const location = useLocation();

  const {
    data = {
      projects: [],
      createdIssuesLast7Days: [],
      completedIssuesLast7Days: [],
    },
    isLoading,
  } = useGetProjects(user.org?._id);

  return (
    <>
      <MantineNavBar.Section grow component={ScrollArea}>
        <NavLink
          icon={<Home />}
          label="Dashboard"
          component={Link}
          to="/dashboard"
          active={location.pathname.startsWith('/dashboard')}
          mb={15}
          onClick={onClose}
        />
        <NavLink icon={<List />} label="Projects" childrenOffset={24}>
          <ScrollArea.Autosize maxHeight={270} scrollbarSize={10}>
            {data.projects.map((project) => (
              <NavLink
                key={project._id}
                icon={<Subtask />}
                label={project.name}
                component={Link}
                to={`/projects/${project._id}`}
                active={location.pathname === `/projects/${project._id}`}
                sx={(theme) => ({
                  borderLeft: `1px solid ${theme.colors.gray[3]}`,
                })}
                onClick={onClose}
              />
            ))}
            {isLoading && (
              <Group
                spacing={12}
                px={16}
                py={10}
                mt={8}
                sx={(theme) => ({
                  borderLeft: `1px solid ${theme.colors.gray[3]}`,
                })}
              >
                <Skeleton circle height={20} />
                <Skeleton height={10} width={120} radius="xl" />
              </Group>
            )}
            {/* TODO: When no project created */}
          </ScrollArea.Autosize>
        </NavLink>
        <NavLink
          icon={<FileSettings />}
          label="Project Management"
          component={Link}
          to="/project-management"
          active={location.pathname === '/project-management'}
          my={15}
          onClick={onClose}
        />
        <NavLink
          icon={<Settings />}
          label="Admin Settings"
          component={Link}
          to="/admin-settings"
          active={location.pathname === '/admin-settings'}
          onClick={onClose}
        />
      </MantineNavBar.Section>
      <Divider my={15} />
      <MantineNavBar.Section>
        <UserProfile user={user} />
      </MantineNavBar.Section>
    </>
  );
}

export default Navbar;
