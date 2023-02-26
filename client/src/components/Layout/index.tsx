import {
  Affix,
  AppShell,
  Button,
  Header,
  Loader,
  Navbar,
  Transition,
} from '@mantine/core';
import { useHotkeys, useScrollLock, useWindowScroll } from '@mantine/hooks';
import { openSpotlight, SpotlightProvider } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import React, { useState } from 'react';
import {
  NavigateFunction,
  Outlet,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { ArrowUp, Search } from 'tabler-icons-react';

import { SearchedIssue, useGetAllIssues } from 'api/issues/getAllIssues';
import { BugIcon, StoryIcon, TaskIcon } from 'assets/icons';
import { Issue, User } from 'types';

import HeaderContent from './Header';
import styles from './Layout.module.css';
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

  const [scroll, scrollTo] = useWindowScroll();
  const setScrollLocked = useScrollLock()[1];

  const [searchParams] = useSearchParams();
  const selectedIssue = searchParams.get('selectedIssue');

  useHotkeys([
    [
      'mod + K',
      () => {
        if (selectedIssue) return;
        openSpotlight();
      },
    ],
  ]);

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
      shortcut={null}
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
              onToggleNavbar={() => {
                setOpened((o) => !o);
                setScrollLocked((l) => !l);
              }}
              onClose={() => {
                setOpened(false);
                setScrollLocked(false);
              }}
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
            className={styles.nav}
          >
            <NavbarContent
              onClose={() => {
                setOpened(false);
                setScrollLocked(false);
              }}
              user={user}
            />
          </Navbar>
        }
      >
        <Outlet context={{ user }} />
        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 800 && !opened}>
            {(transitionStyles) => (
              <Button
                leftIcon={<ArrowUp size={16} />}
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}
              >
                Scroll to Top
              </Button>
            )}
          </Transition>
        </Affix>
      </AppShell>
    </SpotlightProvider>
  );
}

export default Layout;
