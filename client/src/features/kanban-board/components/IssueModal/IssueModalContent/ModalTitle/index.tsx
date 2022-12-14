import { ActionIcon } from '@mantine/core';
import React from 'react';
import { Trash, X } from 'tabler-icons-react';

import { Issue } from 'types';

import DeleteModal from './DeleteModal';
import styles from './ModalTitle.module.css';

type ModalTitleProps = {
  onCloseIssueModal: () => void;
  openDeleteModal: boolean;
  onOpenDeleteModal: () => void;
  onCloseDeleteModal: () => void;
  issue: Issue;
};

function ModalTitle({
  onCloseIssueModal,
  openDeleteModal,
  onOpenDeleteModal,
  onCloseDeleteModal,
  issue,
}: ModalTitleProps) {
  return (
    <>
      <DeleteModal
        onCloseIssueModal={onCloseIssueModal}
        openDeleteModal={openDeleteModal}
        onCloseDeleteModal={onCloseDeleteModal}
        issue={issue}
      />
      <div className={styles.container}>
        <h2 className={styles.title}>Issue Details</h2>
        <div className={styles.actions}>
          <ActionIcon
            color="dark"
            className={styles['action-btn']}
            onClick={onOpenDeleteModal}
          >
            <Trash size={20} />
          </ActionIcon>
          <ActionIcon
            color="dark"
            className={styles['action-btn']}
            onClick={onCloseIssueModal}
          >
            <X size={20} />
          </ActionIcon>
        </div>
      </div>
    </>
  );
}

export default ModalTitle;
