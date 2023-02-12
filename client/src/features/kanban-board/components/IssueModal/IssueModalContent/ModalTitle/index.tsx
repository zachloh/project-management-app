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
  orgId: string | undefined;
};

function ModalTitle({
  onCloseIssueModal,
  openDeleteModal,
  onOpenDeleteModal,
  onCloseDeleteModal,
  issue,
  orgId,
}: ModalTitleProps) {
  return (
    <>
      <DeleteModal
        onCloseIssueModal={onCloseIssueModal}
        openDeleteModal={openDeleteModal}
        onCloseDeleteModal={onCloseDeleteModal}
        issue={issue}
        orgId={orgId}
      />
      <div className={styles.container}>
        <h2 className={styles.title}>Issue Details</h2>
        <div className={styles.actions}>
          <ActionIcon
            color="dark"
            className={styles['action-btn']}
            onClick={onOpenDeleteModal}
            aria-label="Delete issue"
          >
            <Trash size={20} />
          </ActionIcon>
          <ActionIcon
            color="dark"
            className={styles['action-btn']}
            onClick={onCloseIssueModal}
            aria-label="Close issue details modal"
          >
            <X size={20} />
          </ActionIcon>
        </div>
      </div>
    </>
  );
}

export default ModalTitle;
