import { AppShell, Header, Loader, Navbar } from '@mantine/core';
import { SpotlightProvider } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import React, { useState } from 'react';
import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import { Search } from 'tabler-icons-react';

import { SearchedIssue, useGetAllIssues } from 'api/issues/getAllIssues';
import { BugIcon, StoryIcon, TaskIcon } from 'assets/icons';
import { Issue, User } from 'types';

import HeaderContent from './Header';
import NavbarContent from './Navbar';

type LayoutProps = {
  user: User;
};

const typeIcons: Record<Issue['type'], React.ReactNode> = {
  task: <TaskIcon />,
  story: <StoryIcon />,
  bug: <BugIcon />,
};

const getActions = (
  issues: SearchedIssue[],
  navigate: NavigateFunction
): SpotlightAction[] =>
  issues.map((issue) => ({
    id: issue._id,
    title: issue.title,
    icon: typeIcons[issue.type],
    onTrigger: () => {
      navigate(`/projects/${issue.project}?selectedIssue=${issue._id}`);
    },
  }));

function Layout({ user }: LayoutProps) {
  const [opened, setOpened] = useState(false);

  const { data, isSuccess, isFetching } = useGetAllIssues(
    user.org?._id,
    user._id
  );
  const navigate = useNavigate();

  return (
    <SpotlightProvider
      actions={isSuccess ? getActions(data, navigate) : []}
      searchIcon={isFetching ? <Loader size={20} /> : <Search size={20} />}
      searchPlaceholder="Search issues"
      nothingFoundMessage="No issue found"
      overlayOpacity={0.5}
      overlayBlur={0}
      highlightQuery
      highlightColor="violet"
      styles={{
        actionIcon: {
          flexShrink: 0,
        },
      }}
    >
      <AppShell
        padding={24}
        header={
          <Header
            height={{ base: 60, sm: 70 }}
            px="md"
            sx={{
              '@media (max-width: 319px)': {
                paddingLeft: 10,
                paddingRight: 10,
              },
            }}
          >
            <HeaderContent
              opened={opened}
              onToggleNavbar={() => setOpened((o) => !o)}
              onClose={() => setOpened(false)}
            />
          </Header>
        }
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 250, lg: 300 }}
            aria-label="Main"
          >
            <NavbarContent onClose={() => setOpened(false)} user={user} />
          </Navbar>
        }
      >
        <Outlet context={{ user }} />
      </AppShell>
    </SpotlightProvider>
  );
}

export default Layout;
