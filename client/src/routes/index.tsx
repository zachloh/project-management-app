import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from 'components/Layout';
import { KanbanBoard } from 'features/kanban-board';
import { OverviewDashboard } from 'features/overview-dashboard';
import { ProjectDashboard } from 'features/project-dashboard';

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<OverviewDashboard />} />
        <Route path="/dashboard/:projectId" element={<ProjectDashboard />} />
        <Route path="/projects/:projectId" element={<KanbanBoard />} />
      </Routes>
    </Layout>
  );
}

export default AppRoutes;
