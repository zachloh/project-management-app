import { ScrollArea, Tabs } from '@mantine/core';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProjects } from 'api/projects/getProjects';
import { useGetUser } from 'api/users/getUser';

function DashboardTabs() {
  const { data: user } = useGetUser();
  const {
    data = {
      projects: [],
      createdIssuesLast7Days: [],
      completedIssuesLast7Days: [],
    },
  } = useGetProjects(user?.org?._id);
  const { projectId } = useParams();
  const navigate = useNavigate();

  return (
    <ScrollArea mb={25} mt={5} scrollbarSize={8} pb={12}>
      <Tabs
        color="violet.3"
        radius="xs"
        styles={(theme) => ({
          tabLabel: {
            fontSize: 16,
          },
          tabsList: {
            flexWrap: 'nowrap',
          },
          tab: {
            color: theme.colors.gray[7],
            '&:hover': {
              backgroundColor: theme.colors.gray[1],
            },
            '&[data-active]': {
              color: theme.colors.gray[7],
              fontWeight: 700,
            },
          },
        })}
        value={projectId || 'overview'}
        onTabChange={(value) => {
          if (value === 'overview') {
            navigate('/dashboard');
            return;
          }
          navigate(`/dashboard/${value || ''}`);
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          {data.projects.map((project) => (
            <Tabs.Tab key={project._id} value={project._id}>
              {project.name}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </ScrollArea>
  );
}

export default DashboardTabs;
