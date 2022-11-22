import { Card, Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useSearchParams } from 'react-router-dom';

import { Issue } from 'types';

import CreateIssueBtn from './CreateIssueBtn';
import IssueCard from './IssueCard';
import IssueModalContent from './IssueModalContent';
import styles from './KanbanCard.module.css';

type KanbanCardProps = {
  title: string;
  issues: Issue[];
  id: string;
};

function KanbanCard({ title, issues, id }: KanbanCardProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedIssue = searchParams.get('selectedIssue');
  const isMobile = useMediaQuery('(max-width: 425px)');

  const closeModal = () => {
    setSearchParams();
  };

  return (
    <>
      <Modal
        opened={!!searchParams.get('selectedIssue')}
        onClose={closeModal}
        overlayOpacity={0.15}
        shadow="xs"
        withCloseButton={false}
        fullScreen={isMobile}
        size={1000}
      >
        <IssueModalContent
          selectedIssue={selectedIssue}
          onCloseModal={closeModal}
        />
      </Modal>
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
                  onClick={() => setSearchParams({ selectedIssue: issue._id })}
                />
              ))}
              {provided.placeholder}
              <CreateIssueBtn />
            </div>
          )}
        </Droppable>
      </Card>
    </>
  );
}

export default KanbanCard;
