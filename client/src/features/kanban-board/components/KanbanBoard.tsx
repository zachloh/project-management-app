import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useGetProject } from 'api/getProject';
import {
  SourceOrDestination,
  useUpdateIssueStatus,
} from 'api/updateIssueStatus';

import IssueModal from './IssueModal';
import styles from './KanbanBoard.module.css';
import KanbanCard from './KanbanCard';

export function KanbanBoard() {
  // TODO: get projectId instead of hardcoding
  const {
    data: project = {
      _id: '636b1c6de180fd4878e015f5',
      todoIssues: [],
      inProgressIssues: [],
      inReviewIssues: [],
      completedIssues: [],
    },
    isLoading,
  } = useGetProject('636b1c6de180fd4878e015f5');

  const updateIssueStatusMutation = useUpdateIssueStatus(project._id);

  const onDragEnd = (result: DropResult) => {
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

    updateIssueStatusMutation.mutate({
      issueId,
      source: source.droppableId as SourceOrDestination,
      sourceIndex: source.index,
      destination: destination.droppableId as SourceOrDestination,
      destinationIndex: destination.index,
    });
  };

  // TODO: Add skeleton
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.container}>
        <IssueModal />
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
