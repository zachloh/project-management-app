import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from 'components/Layout';
import { RegisterForm, LoginForm, RequireAuth } from 'features/auth';
import { KanbanBoard } from 'features/kanban-board';
import { OverviewDashboard } from 'features/overview-dashboard';
import { ProjectDashboard } from 'features/project-dashboard';
import { Welcome } from 'features/user';

// TODO: Add catch all 404 routes component
function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<OverviewDashboard />} />
        <Route path="/dashboard/:projectId" element={<ProjectDashboard />} />
        <Route path="/projects/:projectId" element={<KanbanBoard />} />
      </Route>
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
}

export default AppRoutes;
