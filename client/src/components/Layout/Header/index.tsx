import {
  MediaQuery,
  Burger,
  Text,
  Group,
  Grid,
  Center,
  Title,
} from '@mantine/core';
import React from 'react';
import { Box } from 'tabler-icons-react';

import styles from './Header.module.css';

type HeaderProps = {
  opened: boolean;
  onToggleNavbar: () => void;
};

function Header({ opened, onToggleNavbar }: HeaderProps) {
  return (
    <Grid align="center" h="100%" m={0}>
      <Grid.Col span="auto" p={0}>
        <Group spacing={4}>
          <Box size={48} color="#845EF7" />
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Text className={styles.logo}>ProjectHub</Text>
          </MediaQuery>
        </Group>
      </Grid.Col>
      <Grid.Col span={4} p={0}>
        <Center>
          <Title order={1} size={22} color="dark.5">
            {/* TODO: Make title dynamic */}
            Dashboard
          </Title>
        </Center>
      </Grid.Col>
      <Grid.Col span="auto" p={0} sx={{ textAlign: 'right' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={onToggleNavbar}
            size="sm"
            color="#2C2E33"
            aria-label="Open navigation"
          />
        </MediaQuery>
      </Grid.Col>
    </Grid>
  );
}

export default Header;
