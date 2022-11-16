import { Card, Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Issue } from 'types';

import CreateIssueBtn from './CreateIssueBtn';
import IssueCard from './IssueCard';
import IssueModalContent from './IssueModalContent';
import styles from './KanbanCard.module.css';

type KanbanCardProps = {
  title: string;
  issues: Issue[];
};

function KanbanCard({ title, issues }: KanbanCardProps) {
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
        overlayOpacity={0.05}
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
        {issues.map((issue) => (
          <IssueCard
            key={issue._id}
            title={issue.title}
            type={issue.type}
            priority={issue.priority}
            onClick={() => setSearchParams({ selectedIssue: issue._id })}
          />
        ))}
        <CreateIssueBtn />
      </Card>
    </>
  );
}

export default KanbanCard;
