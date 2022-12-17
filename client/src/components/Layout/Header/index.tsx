import { Drawer, Button, Stack, NavLink, Container } from '@mantine/core';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu2,
  Box,
  Home,
  List,
  Subtask,
  FileSettings,
  Settings,
} from 'tabler-icons-react';

import styles from './Header.module.css';

function Header() {
  const location = useLocation();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Container px="0" className={styles.logo}>
            <Box size={48} color="#845EF7" />
            ProjectHub
          </Container>
        }
        padding="xl"
        size="75%"
        transitionDuration={400}
        transitionTimingFunction="ease"
        overlayOpacity={0.35}
      >
        <nav aria-label="Primary">
          <Stack>
            <NavLink
              icon={<Home />}
              label="Dashboard"
              active={location.pathname === '/'}
              color="violet"
            />
            <NavLink icon={<List />} label="Projects">
              <NavLink icon={<Subtask />} label="Project 1" />
              <NavLink icon={<Subtask />} label="Project 2" />
            </NavLink>
            <NavLink icon={<FileSettings />} label="Project Management" />
            <NavLink icon={<Settings />} label="Admin Settings" />
          </Stack>
        </nav>
      </Drawer>

      <header className={styles.header}>
        <Button
          onClick={() => setOpened(true)}
          variant="subtle"
          color="dark"
          p="0"
        >
          <Menu2 />
        </Button>
        <h1 className={styles.title}>Dashboard</h1>
      </header>
    </>
  );
}

export default Header;
