import { Avatar, Card, Tooltip } from '@mantine/core';
import React from 'react';

import { LowPriorityIcon, TaskIcon } from 'assets/icons';

import styles from './IssueCard.module.css';

function IssueCard() {
  return (
    <Card shadow="xs" p={8} className={styles.card} mb={4}>
      <div className={styles['todo-container']}>
        <p className={styles['issue-title']}>To do 1</p>
        <div className={styles['issue-info']}>
          <Tooltip label="Type: Task" withArrow openDelay={300}>
            <div>
              <TaskIcon />
            </div>
          </Tooltip>
          <p>PROJ-1</p>
          <Tooltip label="Priority: Low" withArrow openDelay={300}>
            <div className={styles.priority}>
              <LowPriorityIcon />
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
  );
}

export default IssueCard;
