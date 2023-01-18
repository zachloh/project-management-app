import { ActionIcon, Box, Group, Modal } from '@mantine/core';
import React from 'react';
import { X } from 'tabler-icons-react';

import { User } from 'types';

import EditProfileForm from './EditProfileForm';
import styles from './EditProfileModal.module.css';

type EditProfileModalProps = {
  opened: boolean;
  onClose: () => void;
  user: User;
};

function EditProfileModal({ opened, onClose, user }: EditProfileModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      overlayOpacity={0.5}
      shadow="xs"
      withCloseButton={false}
      transitionDuration={300}
      centered
    >
      {opened ? (
        <>
          <Group align="center" position="apart" mb={10}>
            <h2 className={styles.title}>Edit Profile</h2>
            <ActionIcon
              color="dark"
              className={styles.action}
              onClick={onClose}
              aria-label="Close edit profile modal"
            >
              <X size={20} />
            </ActionIcon>
          </Group>
          <EditProfileForm user={user} onClose={onClose} />
        </>
      ) : (
        <Box mih={510} />
      )}
    </Modal>
  );
}

export default EditProfileModal;
