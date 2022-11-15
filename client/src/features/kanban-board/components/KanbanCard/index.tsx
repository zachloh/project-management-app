import { Card } from '@mantine/core';
import React from 'react';

import { Issue } from 'types';

import CreateIssueBtn from './CreateIssueBtn';
import IssueCard from './IssueCard';
import styles from './KanbanCard.module.css';

type KanbanCardProps = {
  title: string;
  issues: Issue[];
};

function KanbanCard({ title, issues }: KanbanCardProps) {
  return (
    <Card p={5} radius="md" className={styles.card}>
      <div className={styles.title}>
        <span>{title}</span>
        <span>{issues.length}</span>
      </div>
      {issues.map((issue) => (
        <IssueCard
          key={issue._id}
          title={issue.title}
          type={issue.type}
          priority={issue.priority}
        />
      ))}
      <CreateIssueBtn />
    </Card>
  );
}

export default KanbanCard;
