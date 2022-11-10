import React from 'react';

import AppProviders from 'providers';
import AppRoutes from 'routes';
import 'config/chart-js';

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
