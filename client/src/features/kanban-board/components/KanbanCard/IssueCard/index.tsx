import { Avatar, Card, Tooltip } from '@mantine/core';
import { useIsMutating, useIsFetching } from '@tanstack/react-query';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import {
  BugIcon,
  HighPriorityIcon,
  LowPriorityIcon,
  MediumPriorityIcon,
  StoryIcon,
  TaskIcon,
} from 'assets/icons';
import { capitalizeFirstLetter } from 'utils';

import styles from './IssueCard.module.css';

type IssueCardProps = {
  id: string;
  index: number;
  title: string;
  type: 'task' | 'story' | 'bug';
  priority: 'low' | 'medium' | 'high';
  onClick?: () => void;
};

const typeIcons: Record<IssueCardProps['type'], React.ReactNode> = {
  task: <TaskIcon />,
  story: <StoryIcon />,
  bug: <BugIcon />,
};

const priorityIcons: Record<IssueCardProps['priority'], React.ReactNode> = {
  low: <LowPriorityIcon />,
  medium: <MediumPriorityIcon />,
  high: <HighPriorityIcon />,
};

function IssueCard({
  id,
  index,
  title,
  type,
  priority,
  onClick,
}: IssueCardProps) {
  const isMutating = useIsMutating();
  const isFetchingProject = useIsFetching({ queryKey: ['projects'] });

  return (
    <Draggable
      draggableId={id}
      index={index}
      isDragDisabled={isMutating > 0 || isFetchingProject > 0}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.draggable}
        >
          <Card shadow="xs" p={12} className={styles.card} onClick={onClick}>
            <div className={styles['issue-container']}>
              <p className={styles['issue-title']}>{title}</p>
              <div className={styles['issue-info']}>
                <Tooltip
                  label={`Type: ${capitalizeFirstLetter(type)}`}
                  withArrow
                  openDelay={300}
                  offset={2}
                >
                  <div className={styles.type}>{typeIcons[type]}</div>
                </Tooltip>
                <Tooltip
                  label={`Priority: ${capitalizeFirstLetter(priority)}`}
                  withArrow
                  openDelay={300}
                  offset={2}
                >
                  <div className={styles.priority}>
                    {priorityIcons[priority]}
                  </div>
                </Tooltip>
                <Tooltip label="John Doe" withArrow openDelay={300}>
                  <Avatar
                    radius="xl"
                    size="sm"
                    ml="auto"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                  />
                </Tooltip>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
}

export default IssueCard;
