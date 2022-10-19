import { Drawer, Button, Stack, NavLink, Container } from '@mantine/core';
import React, { useState } from 'react';
import { Menu2, Box } from 'tabler-icons-react';

import styles from 'components/Dashboard.module.css';

function Dashboard() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Container px="0" className={styles.title}>
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
        <Stack>
          <NavLink label="Dashboard" active color="violet" />
          <NavLink label="Projects" />
          <NavLink label="Project Management" />
        </Stack>
      </Drawer>

      <Button onClick={() => setOpened(true)}>
        <Menu2 />
      </Button>
    </>
  );
}

export default Dashboard;
