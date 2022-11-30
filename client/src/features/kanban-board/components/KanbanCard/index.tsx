import { Card } from '@mantine/core';
import { useIsMutating } from '@tanstack/react-query';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useSearchParams } from 'react-router-dom';

import { Issue } from 'types';

import CreateIssueBtn from './CreateIssueBtn';
import IssueCard from './IssueCard';
import styles from './KanbanCard.module.css';

type KanbanCardProps = {
  title: string;
  issues: Issue[];
  id: string;
};

function KanbanCard({ title, issues, id }: KanbanCardProps) {
  const setSearchParams = useSearchParams()[1];
  const isMutating = useIsMutating();

  return (
    <Card p={5} radius="md" className={styles.card}>
      <div className={styles.title}>
        <span>{title}</span>
        <span>{issues.length}</span>
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles['issues-container']}
          >
            {issues.map((issue, index) => (
              <IssueCard
                key={issue._id}
                id={issue._id}
                index={index}
                title={issue.title}
                type={issue.type}
                priority={issue.priority}
                onClick={() => {
                  if (isMutating > 0) return;
                  setSearchParams({ selectedIssue: issue._id });
                }}
              />
            ))}
            {provided.placeholder}
            <CreateIssueBtn />
          </div>
        )}
      </Droppable>
    </Card>
  );
}

export default KanbanCard;
