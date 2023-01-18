import { AppShell, Header, Navbar } from '@mantine/core';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import HeaderContent from './Header';
import NavbarContent from './Navbar';

function Layout() {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding={16}
      header={
        <Header height={70} px="md">
          <HeaderContent
            opened={opened}
            onToggleNavbar={() => setOpened((o) => !o)}
          />
        </Header>
      }
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 250, lg: 300 }}
        >
          <NavbarContent onClose={() => setOpened(false)} />
        </Navbar>
      }
    >
      <Outlet />
    </AppShell>
  );
}

export default Layout;
