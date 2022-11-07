import { Card } from '@mantine/core';
import React from 'react';

import CreateIssueBtn from './CreateIssueBtn';
import styles from './KanbanCard.module.css';

type KanbanCardProps = {
  title: string;
  totalIssues: number;
  children?: React.ReactNode;
};

function KanbanCard({ title, totalIssues, children }: KanbanCardProps) {
  return (
    <Card p={5} radius="md" className={styles.card}>
      <div className={styles.title}>
        <span>{title}</span>
        <span>{totalIssues}</span>
      </div>
      {children}
      <CreateIssueBtn />
    </Card>
  );
}

export default KanbanCard;
