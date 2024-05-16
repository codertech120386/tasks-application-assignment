import { combineReducers } from '@reduxjs/toolkit';

import registerReducer from '../features/auth/register/register.slice';
import loginReducer from '../features/auth/login/login.slice';
import getAlTasksReducer from '../features/tasks/task.slice';

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  getAllTasks: getAlTasksReducer,
});

export default rootReducer;
