import { ActionIcon, Group } from '@mantine/core';
import React from 'react';
import { X } from 'tabler-icons-react';

import styles from './ModalHeader.module.css';

type ModalHeaderProps = {
  title: string;
  onClose: () => void;
  ariaLabel: string;
};

function ModalHeader({ title, onClose, ariaLabel }: ModalHeaderProps) {
  return (
    <Group align="center" position="apart" mb={10}>
      <h2 className={styles.title}>{title}</h2>
      <ActionIcon
        color="dark"
        className={styles.action}
        onClick={onClose}
        aria-label={ariaLabel}
      >
        <X size={20} />
      </ActionIcon>
    </Group>
  );
}

export default ModalHeader;
