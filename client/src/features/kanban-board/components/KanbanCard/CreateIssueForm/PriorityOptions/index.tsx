import { Button, Group, Menu, Tooltip } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React, { useState } from 'react';
import { ChevronDown } from 'tabler-icons-react';

import {
  HighPriorityIcon,
  LowPriorityIcon,
  MediumPriorityIcon,
} from 'assets/icons';
import { Issue } from 'types';
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';

import { CreateIssueFormValues } from '../types';
import styles from './PriorityOptions.module.css';

const priorityIcons: Record<Issue['priority'], React.ReactNode> = {
  low: <LowPriorityIcon />,
  medium: <MediumPriorityIcon />,
  high: <HighPriorityIcon />,
};

function PriorityOptions({
  form,
}: {
  form: UseFormReturnType<CreateIssueFormValues>;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <div className={styles.container}>
      <Menu
        width={110}
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
            label={`Priority: ${capitalizeFirstLetter(form.values.priority)}`}
            disabled={opened}
          >
            <Button
              variant="subtle"
              px={2}
              rightIcon={<ChevronDown color="#5C5F66" size={16} />}
              {...form.getInputProps('priority')}
              styles={(theme) => ({
                root: {
                  height: 28,
                  borderWidth: 0,

                  '&:hover': {
                    backgroundColor: theme.colors.gray[3],
                  },
                },
                rightIcon: {
                  marginLeft: 2,
                },
              })}
            >
              {priorityIcons[form.values.priority]}
            </Button>
          </Tooltip>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => {
              form.setValues({ priority: 'low' });
            }}
            className={
              form.values.priority === 'low' && opened
                ? styles.selected
                : undefined
            }
          >
            <Group noWrap spacing={4}>
              <LowPriorityIcon />
              Low
            </Group>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              form.setValues({ priority: 'medium' });
            }}
            className={
              form.values.priority === 'medium' && opened
                ? styles.selected
                : undefined
            }
          >
            <Group noWrap spacing={4}>
              <MediumPriorityIcon />
              Medium
            </Group>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              form.setValues({ priority: 'high' });
            }}
            className={
              form.values.priority === 'high' && opened
                ? styles.selected
                : undefined
            }
          >
            <Group noWrap spacing={4}>
              <HighPriorityIcon />
              High
            </Group>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default PriorityOptions;
