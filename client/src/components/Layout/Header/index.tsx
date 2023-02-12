import {
  MediaQuery,
  Burger,
  Text,
  Grid,
  Anchor,
  Button,
  Kbd,
} from '@mantine/core';
import { openSpotlight } from '@mantine/spotlight';
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Search } from 'tabler-icons-react';

import styles from './Header.module.css';

type HeaderProps = {
  opened: boolean;
  onToggleNavbar: () => void;
  onClose: () => void;
};

function Header({ opened, onToggleNavbar, onClose }: HeaderProps) {
  return (
    <Grid align="center" h="100%" m={0} className={styles.header}>
      <Grid.Col span={8} sm="content" p={0} order={2} orderSm={1}>
        <div className={styles.link}>
          <Anchor
            component={Link}
            to="/dashboard"
            underline={false}
            onClick={onClose}
          >
            <div className={styles['logo-container']}>
              <MediaQuery largerThan={768} styles={{ display: 'none' }}>
                <Box size={34} color="#845EF7" />
              </MediaQuery>
              <MediaQuery smallerThan={768} styles={{ display: 'none' }}>
                <Box size={48} color="#845EF7" />
              </MediaQuery>
              <Text className={styles.logo}>ProjectHub</Text>
            </div>
          </Anchor>
        </div>
      </Grid.Col>
      <Grid.Col span={2} sm="auto" p={0} order={1} orderSm={2}>
        <MediaQuery largerThan={768} styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={onToggleNavbar}
            size="sm"
            color="#2C2E33"
            aria-label="Open navigation"
          />
        </MediaQuery>
      </Grid.Col>
      <Grid.Col span={2} sm="content" p={0} pr={8} order={3}>
        <MediaQuery smallerThan={768} styles={{ display: 'none' }}>
          <Button
            variant="outline"
            color="gray.6"
            radius={6}
            fw={400}
            leftIcon={<Search size={16} color="#373A40" />}
            rightIcon={<Kbd>Ctrl + K</Kbd>}
            styles={(theme) => ({
              root: {
                borderColor: theme.colors.gray[4],
                '&:active': {
                  transform: 'none',
                },
              },
              label: {
                marginRight: 50,
              },
            })}
            onClick={() => openSpotlight()}
          >
            Search issues
          </Button>
        </MediaQuery>
      </Grid.Col>
    </Grid>
  );
}

export default Header;
