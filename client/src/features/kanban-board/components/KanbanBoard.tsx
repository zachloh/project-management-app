import React from 'react';

import IssueCard from './IssueCard';
import styles from './KanbanBoard.module.css';
import KanbanCard from './KanbanCard';

export function KanbanBoard() {
  return (
    <div className={styles.container}>
      <KanbanCard title="TO DO" totalIssues={1}>
        <IssueCard />
      </KanbanCard>
      <KanbanCard title="IN PROGRESS" totalIssues={2}>
        <IssueCard />
        <IssueCard />
      </KanbanCard>
      <KanbanCard title="IN REVIEW" totalIssues={1}>
        <IssueCard />
      </KanbanCard>
      <KanbanCard title="DONE" totalIssues={0} />
    </div>
  );
}
