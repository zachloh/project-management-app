import { ActionIcon } from '@mantine/core';
import React from 'react';
import { Trash, X } from 'tabler-icons-react';

import styles from './ModalTitle.module.css';

type ModalTitleProps = {
  onCloseModal: () => void;
};

function ModalTitle({ onCloseModal }: ModalTitleProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Issue Details</h2>
      <div className={styles.actions}>
        <ActionIcon color="dark" className={styles['action-btn']}>
          <Trash size={20} />
        </ActionIcon>
        <ActionIcon
          color="dark"
          className={styles['action-btn']}
          onClick={onCloseModal}
        >
          <X size={20} />
        </ActionIcon>
      </div>
    </div>
  );
}

export default ModalTitle;
