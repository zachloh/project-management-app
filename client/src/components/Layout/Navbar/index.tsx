import {
  NavLink,
  Navbar as MantineNavBar,
  ScrollArea,
  Divider,
  Box,
} from '@mantine/core';
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Home,
  List,
  Subtask,
  FileSettings,
  Settings,
} from 'tabler-icons-react';

function Navbar() {
  const location = useLocation();

  return (
    <>
      <MantineNavBar.Section grow component={ScrollArea}>
        <NavLink
          icon={<Home />}
          label="Dashboard"
          active={location.pathname === '/dashboard'}
          mb={15}
        />
        <NavLink icon={<List />} label="Projects" childrenOffset={36}>
          <ScrollArea.Autosize maxHeight={270} scrollbarSize={10}>
            <NavLink icon={<Subtask />} label="Project 1" />
            <NavLink icon={<Subtask />} label="Project 2" />
            {/* TODO: When no project created */}
          </ScrollArea.Autosize>
        </NavLink>
        <NavLink icon={<FileSettings />} label="Project Management" my={15} />
        <NavLink icon={<Settings />} label="Admin Settings" />
      </MantineNavBar.Section>
      <Divider my={15} />
      <MantineNavBar.Section>
        <Box px={12}>Test</Box>
      </MantineNavBar.Section>
    </>
  );
}

export default Navbar;
