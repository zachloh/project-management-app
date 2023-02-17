import { Anchor, Avatar, Badge, Table, Tooltip } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { PopulatedIssue, Project } from 'types';
import { getInitials } from 'utils/getInitials';

import ActionsBtn from './ActionsBtn';
import styles from './ProjectsTable.module.css';

type ProjectsTableProps = {
  projects: Project<PopulatedIssue>[];
  orgId: string | undefined;
};

function ProjectsTable({ projects, orgId }: ProjectsTableProps) {
  return (
    <div className={styles.container}>
      <Table
        withBorder
        className={styles.table}
        verticalSpacing="md"
        horizontalSpacing={20}
      >
        <thead>
          <tr>
            <th className={styles['action-column']}>&nbsp;</th>
            <th className={styles['name-column']}>NAME</th>
            <th>CATEGORY</th>
            <th>MEMBERS</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>
                <ActionsBtn project={project} orgId={orgId} />
              </td>
              <td>
                <Anchor
                  component={Link}
                  to={`/projects/${project._id}`}
                  color="dark.4"
                  size={16}
                  weight={600}
                >
                  {project.name}
                </Anchor>
              </td>
              <td>
                <Badge color="violet.7" size="lg">
                  {project.category}
                </Badge>
              </td>
              <td>
                <Avatar.Group spacing="xs">
                  {project.members.map((member) => (
                    <Tooltip
                      key={member._id}
                      label={`${member.firstName} ${member.lastName}`}
                      withArrow
                      position="bottom"
                      openDelay={300}
                    >
                      <Avatar color="violet.7" radius="xl">
                        {getInitials(member.firstName, member.lastName)}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Avatar.Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProjectsTable;
