import { Suspense } from 'react';
import './App.css';
import { Loader } from '@mantine/core';
import Router from './router';

function App() {
  return (
    <div className='App'>
      <Suspense
        fallback={
          <div className='w-full h-screen flex items-center justify-center'>
            <Loader color='#DBBE46' />
          </div>
        }
      >
        <Router />
      </Suspense>
    </div>
  );
}

export default App;
