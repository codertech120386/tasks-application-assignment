import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  // Common configuration for all environments
  const commonConfig = {
    plugins: [react()],
  };

  // Local configuration
  const localConfig = {
    ...commonConfig,
    define: {
      'process.env': {
        API_URL: 'http://localhost:8000/',
        REACT_APP_ENV: 'local',
      },
    },
  };

  // we can add other environment configurations too for e.g staging ( not used currently)
  const stageConfig = {
    ...commonConfig,
    define: {
      'process.env': {
        API_URL: 'https://api-staging.pesto.com/',
        REACT_APP_ENV: 'stage',
      },
    },
  };

  // Return the configuration based on the mode
  if (mode === 'localhost') {
    return defineConfig(localConfig);
  } else if (mode === 'stage') {
    return defineConfig(stageConfig);
  }
  return commonConfig;
};
