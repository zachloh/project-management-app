import React from 'react';

import { useGetProject } from 'api/getProject';

import styles from './KanbanBoard.module.css';
import KanbanCard from './KanbanCard';

export function KanbanBoard() {
  const {
    data: project = {
      todoIssues: [],
      inProgressIssues: [],
      inReviewIssues: [],
      completedIssues: [],
    },
    isLoading,
  } = useGetProject('636b1c6de180fd4878e015f5');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <KanbanCard title="TO DO" issues={project.todoIssues} />
      <KanbanCard title="IN PROGRESS" issues={project.inProgressIssues} />
      <KanbanCard title="IN REVIEW" issues={project.inReviewIssues} />
      <KanbanCard title="DONE" issues={project.completedIssues} />
    </div>
  );
}
