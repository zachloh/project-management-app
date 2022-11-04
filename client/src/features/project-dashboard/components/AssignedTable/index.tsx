import { Table, Badge } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { StoryIcon, TaskIcon, BugIcon } from 'assets/icons';

import styles from './AssignedTable.module.css';

function AssignedTable() {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <Table highlightOnHover className={styles.table}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Key</th>
            <th>Title</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => handleRowClick()}>
            <td>
              <div className={styles.type}>
                <TaskIcon />
                <div>Task</div>
              </div>
            </td>
            <td>PROJ-1</td>
            <td>This is my first todo</td>
            <td>
              <Badge color="red.9">High</Badge>
            </td>
          </tr>
          <tr onClick={() => handleRowClick()}>
            <td>
              <div className={styles.type}>
                <StoryIcon />
                <div>Story</div>
              </div>
            </td>
            <td>PROJ-2</td>
            <td>This is my second todo</td>
            <td>
              <Badge color="yellow.9">Medium</Badge>
            </td>
          </tr>
          <tr onClick={() => handleRowClick()}>
            <td>
              <div className={styles.type}>
                <BugIcon />
                <div>Bug</div>
              </div>
            </td>
            <td>PROJ-3</td>
            <td>This is my third todo</td>
            <td>
              <Badge color="green.9">Low</Badge>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default AssignedTable;
