import { Table, ScrollArea, MediaQuery } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from 'hooks/useUser';
import { Issue, Project } from 'types';

import styles from './AssignedTable.module.css';

type AssignedTableProps = {
  project: Project;
};

const mapAssignedIssues = (
  issues: Issue[],
  userId: string,
  onClick: (issueId: string) => void
) =>
  issues
    .filter((issue) => issue.assignee === userId)
    .map((issue) => (
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

  // TODO: Check if no issue assigned

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
          {mapAssignedIssues(project.todoIssues, user._id, handleRowClick)}
          {mapAssignedIssues(
            project.inProgressIssues,
            user._id,
            handleRowClick
          )}
          {mapAssignedIssues(project.inReviewIssues, user._id, handleRowClick)}
          {mapAssignedIssues(project.completedIssues, user._id, handleRowClick)}
        </tbody>
      </Table>
    </ScrollArea>
  );
}

export default AssignedTable;
