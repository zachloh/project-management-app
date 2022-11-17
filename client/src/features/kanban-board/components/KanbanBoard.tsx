import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

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

  const onDragEnd = (result: DropResult) => {
    console.log(result);

    const { draggableId: issueId, source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    console.log(result);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.container}>
        <KanbanCard title="TO DO" issues={project.todoIssues} id="todoIssues" />
        <KanbanCard
          title="IN PROGRESS"
          issues={project.inProgressIssues}
          id="inProgressIssues"
        />
        <KanbanCard
          title="IN REVIEW"
          issues={project.inReviewIssues}
          id="inReviewIssues"
        />
        <KanbanCard
          title="DONE"
          issues={project.completedIssues}
          id="completedIssues"
        />
      </div>
    </DragDropContext>
  );
}
