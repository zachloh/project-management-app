import { Button, Menu } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useState } from 'react';
import { ChevronDown, Edit, Minus, Trash } from 'tabler-icons-react';

import { User } from 'types';

import styles from './ActionsBtn.module.css';
import EditRoleModal from './EditRoleModal';

type ActionsBtnProps = {
  member: User<string>;
  orgId: string;
};

function ActionsBtn({ member, orgId }: ActionsBtnProps) {
  const [opened, setOpened] = useState(false);

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
        <Menu.Dropdown fw={400}>
          <Menu.Item icon={<Edit size={18} />} onClick={() => setOpened(true)}>
            Edit Role
          </Menu.Item>
          <Menu.Item
            icon={<Trash size={18} />}
            color="red.8"
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
            Remove Member
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <EditRoleModal
        opened={opened}
        onClose={() => setOpened(false)}
        member={member}
        orgId={orgId}
      />
    </>
  );
}

export default ActionsBtn;
