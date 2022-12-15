import { Menu, Button, Group, Tooltip } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React, { useState } from 'react';
import { ChevronDown } from 'tabler-icons-react';

import { BugIcon, StoryIcon, TaskIcon } from 'assets/icons';
import { Issue } from 'types';
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';

import { CreateIssueFormValues } from '../types';
import styles from './TypeOptions.module.css';

const typeIcons: Record<Issue['type'], React.ReactNode> = {
  task: <TaskIcon />,
  story: <StoryIcon />,
  bug: <BugIcon />,
};

function TypeOptions({
  form,
}: {
  form: UseFormReturnType<CreateIssueFormValues>;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <div className={styles.container}>
      <Menu
        width={100}
        position="bottom-start"
        shadow="sm"
        opened={opened}
        onChange={setOpened}
        exitTransitionDuration={0}
        styles={(theme) => ({
          item: {
            '&[data-hovered]': {
              backgroundColor: theme.colors.gray[1],
              color: 'inherit',
            },
          },
        })}
      >
        <Menu.Target>
          <Tooltip
            withArrow
            position="top-start"
            openDelay={500}
            label={`Type: ${capitalizeFirstLetter(form.values.type)}`}
            disabled={opened}
          >
            <Button
              variant="subtle"
              px={2}
              rightIcon={<ChevronDown color="#5C5F66" size={16} />}
              {...form.getInputProps('type')}
              styles={(theme) => ({
                root: {
                  height: 28,
                  borderWidth: 0,
                  marginLeft: -2,

                  '&:hover': {
                    backgroundColor: theme.colors.gray[3],
                  },
                },
                rightIcon: {
                  marginLeft: 2,
                },
              })}
            >
              {typeIcons[form.values.type]}
            </Button>
          </Tooltip>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => {
              form.setValues({ type: 'task' });
            }}
            className={
              form.values.type === 'task' && opened
                ? styles.selected
                : undefined
            }
          >
            <Group noWrap spacing={4}>
              <TaskIcon />
              Task
            </Group>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              form.setValues({ type: 'story' });
            }}
            className={
              form.values.type === 'story' && opened
                ? styles.selected
                : undefined
            }
          >
            <Group noWrap spacing={4}>
              <StoryIcon />
              Story
            </Group>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              form.setValues({ type: 'bug' });
            }}
            className={
              form.values.type === 'bug' && opened ? styles.selected : undefined
            }
          >
            <Group noWrap spacing={4}>
              <BugIcon />
              Bug
            </Group>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default TypeOptions;
