import { Table, ScrollArea, MediaQuery, Text } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from 'hooks/useUser';
import { Issue, Project } from 'types';

import styles from './AssignedTable.module.css';

type AssignedTableProps = {
  project: Project;
};

const filterAssignedIssues = (project: Project, userId: string) => {
  const { todoIssues, inProgressIssues, inReviewIssues, completedIssues } =
    project;

  return todoIssues
    .concat(inProgressIssues, inReviewIssues, completedIssues)
    .filter((issue) => issue.assignee === userId);
};

const mapAssignedIssues = (
  issues: Issue[],
  onClick: (issueId: string) => void
) =>
  issues.map((issue) => (
    <tr key={issue._id} onClick={() => onClick(issue._id)}>
      <MediaQuery smallerThan={360} styles={{ display: 'none' }}>
        <td className={styles.status}>{issue.status}</td>
      </MediaQuery>
      <td className={styles.title}>{issue.title}</td>
    </tr>
  ));

function AssignedTable({ project }: AssignedTableProps) {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleRowClick = (issueId: string) => {
    navigate(`/projects/${project._id}?selectedIssue=${issueId}`);
  };

  const filteredIssues = filterAssignedIssues(project, user._id);

  return (
    <ScrollArea h={300} px={12} pb={12} mt={12}>
      <Table highlightOnHover className={styles.table}>
        <thead>
          <tr>
            <MediaQuery smallerThan={360} styles={{ display: 'none' }}>
              <th>Status</th>
            </MediaQuery>
            <th className={styles['title-header']}>Title</th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.length > 0 &&
            mapAssignedIssues(filteredIssues, handleRowClick)}
        </tbody>
      </Table>
      {filteredIssues.length === 0 && (
        <Text align="center" size={14} weight={600} color="dark.3" pt={10}>
          No issues assigned to you
        </Text>
      )}
    </ScrollArea>
  );
}

export default AssignedTable;
