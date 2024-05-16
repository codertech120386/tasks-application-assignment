import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducer';

export function setupStore(preloadedState: any) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
