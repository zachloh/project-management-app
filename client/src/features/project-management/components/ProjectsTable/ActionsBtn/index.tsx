import { Button, Menu } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import { ChevronDown, Edit, Minus, Trash, Users } from 'tabler-icons-react';

import { PopulatedIssue, Project } from 'types';

import styles from './ActionsBtn.module.css';
import DeleteProjectModal from './DeleteProjectModal';
import EditProjectModal from './EditProjectModal';

type ActionsBtnProps = {
  project: Project<PopulatedIssue>;
  orgId: string | undefined;
};

function ActionsBtn({ project, orgId }: ActionsBtnProps) {
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  return (
    <>
      <Menu>
        <Menu.Target>
          <Button
            variant="outline"
            rightIcon={<ChevronDown size={16} />}
            pl={10}
            pr={6}
            miw={95}
          >
            Actions
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<Edit size={18} />}
            onClick={() => setEditModalOpened(true)}
          >
            Edit Project
          </Menu.Item>
          <Menu.Item
            icon={<Users size={18} />}
            className={styles['not-implemented']}
            onClick={() =>
              showNotification({
                title: 'Unavailable',
                message: 'This feature is not available in demo.',
                icon: <Minus />,
                color: 'red',
              })
            }
          >
            Manage Members
          </Menu.Item>
          <Menu.Item
            icon={<Trash size={18} />}
            color="red.8"
            onClick={() => setDeleteModalOpened(true)}
          >
            Delete Project
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <EditProjectModal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        project={project}
        orgId={orgId}
      />
      <DeleteProjectModal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        projectId={project._id}
        orgId={orgId}
      />
    </>
  );
}

export default ActionsBtn;
