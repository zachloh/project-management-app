import { AppShell, Header, Navbar } from '@mantine/core';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { User } from 'types';

import HeaderContent from './Header';
import NavbarContent from './Navbar';

type LayoutProps = {
  user: User;
};

function Layout({ user }: LayoutProps) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding={24}
      header={
        <Header height={70} px="md">
          <HeaderContent
            opened={opened}
            onToggleNavbar={() => setOpened((o) => !o)}
            onClose={() => setOpened(false)}
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
          <NavbarContent onClose={() => setOpened(false)} user={user} />
        </Navbar>
      }
    >
      <Outlet context={{ user }} />
    </AppShell>
  );
}

export default Layout;
