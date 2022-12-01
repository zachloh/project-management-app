import { Modal, Text, Group, Button, ActionIcon } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { X, AlertTriangle } from 'tabler-icons-react';

import { useDeleteIssue } from 'api/deleteIssue';
import { Issue } from 'types';

import styles from './DeleteModal.module.css';

type DeleteModalProps = {
  onCloseIssueModal: () => void;
  openDeleteModal: boolean;
  onCloseDeleteModal: () => void;
  issue: Issue;
};

function DeleteModal({
  onCloseIssueModal,
  openDeleteModal,
  onCloseDeleteModal,
  issue,
}: DeleteModalProps) {
  const isTablet = useMediaQuery('(max-width: 767px)');
  const deleteIssueMutation = useDeleteIssue();

  const handleClickDeleteBtn = () => {
    onCloseDeleteModal();
    onCloseIssueModal();
    deleteIssueMutation.mutate(issue);
  };

  return (
    <Modal
      centered={isTablet}
      opened={openDeleteModal}
      onClose={onCloseDeleteModal}
      overlayOpacity={0.5}
      shadow="xs"
      withCloseButton={false}
    >
      <div className={styles.delete}>
        <AlertTriangle color="#DE350B" size={24} />
        <Text weight={700} size={20}>
          Delete issue?
        </Text>
        <ActionIcon
          ml="auto"
          color="dark"
          className={styles['action-btn']}
          onClick={onCloseDeleteModal}
        >
          <X size={20} />
        </ActionIcon>
      </div>
      <Text size={15}>
        Are you sure you want to delete this issue? This action cannot be
        undone.
      </Text>
      <Group mt={25} position="right">
        <Button variant="default" onClick={onCloseDeleteModal}>
          Cancel
        </Button>
        <Button color="red" onClick={handleClickDeleteBtn}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
}

export default DeleteModal;
