import { Anchor, createStyles, Group, ScrollArea } from '@mantine/core';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useGetProjects } from 'api/projects/getProjects';
import { useUser } from 'hooks/useUser';

const useStyles = createStyles((theme) => ({
  nav: {
    borderBottom: `2px solid ${theme.colors.gray[3]}`,
  },
  tab: {
    fontSize: 16,
    color: theme.colors.gray[7],
    padding: '6px 16px 5px',
    borderBottom: '2px solid transparent',
    marginBottom: -2,
    whiteSpace: 'nowrap',
    '&:hover': {
      color: theme.black,
      backgroundColor: theme.colors.gray[1],
      textDecoration: 'none',
      borderBottomColor: theme.colors.gray[3],
      borderRadius: '4px 4px 0 0',
    },
  },
  activeTab: {
    '&, &:hover': {
      color: theme.black,
      borderBottomColor: theme.colors.violet[3],
    },
  },
}));

function DashboardTabs() {
  const { classes, cx } = useStyles();
  const { user } = useUser();
  const {
    data = {
      projects: [],
      createdIssuesLast7Days: [],
      completedIssuesLast7Days: [],
    },
  } = useGetProjects(user.org?._id);
  const location = useLocation();

  return (
    <ScrollArea mb={25} mt={5} scrollbarSize={8} pb={12}>
      <nav className={classes.nav} aria-label="Dashboard">
        <Group noWrap spacing={0}>
          <Anchor
            component={Link}
            to="/dashboard"
            className={cx(classes.tab, {
              [classes.activeTab]: location.pathname === '/dashboard',
            })}
          >
            Overview
          </Anchor>
          {data.projects.map((project) => (
            <Anchor
              key={project._id}
              component={Link}
              to={`/dashboard/${project._id}`}
              className={cx(classes.tab, {
                [classes.activeTab]:
                  location.pathname === `/dashboard/${project._id}`,
              })}
            >
              {project.name}
            </Anchor>
          ))}
        </Group>
      </nav>
    </ScrollArea>
  );
}

export default DashboardTabs;
