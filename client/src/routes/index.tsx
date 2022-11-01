import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from 'components/Layout';
import { OverviewDashboard } from 'features/overview-dashboard';

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<OverviewDashboard />} />
      </Routes>
    </Layout>
  );
}

export default AppRoutes;
