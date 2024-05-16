import { createSlice } from '@reduxjs/toolkit';
import { modals } from '@mantine/modals';

import {
  GetAllTasksAction,
  DeleteTaskAction,
  EditTaskAction,
  CreateTaskAction,
} from './task.action';
import { ITaskRejectedAction, ITaskState } from './task.interfaces';
import { errorNotification } from '../../utils/components';

const initialState: ITaskState = {
  isLoading: false,
  allTasksDetails: {
    isLoading: false,
    tasks: [],
    totalPages: 0,
    activePage: 1,
  },
};

const GetAllTasksSlice = createSlice({
  name: 'Task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Tasks Actions
    builder.addCase(GetAllTasksAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(GetAllTasksAction.fulfilled, (state, action) => {
      const data = action.payload.data;
      state.allTasksDetails = {
        isLoading: false,
        tasks: data.data.tasks,
        totalPages: data.data.totalPages,
        activePage: data?.data?.activePage || 1,
      };
      state.isLoading = false;
    });

    builder.addCase(GetAllTasksAction.rejected, (state, action) => {
      const payload = action.payload as ITaskRejectedAction;
      errorNotification(payload.response.data.message);
      state.isLoading = false;
    });

    // Delete Task Action
    builder.addCase(DeleteTaskAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(DeleteTaskAction.fulfilled, (state, action) => {
      const data = action.payload.data;
      state.allTasksDetails.tasks = state.allTasksDetails.tasks.filter(
        (task) => task.id != data.data.id
      );
      state.allTasksDetails.isLoading = false;
      state.isLoading = false;
    });

    builder.addCase(DeleteTaskAction.rejected, (state, action) => {
      const payload = action.payload as ITaskRejectedAction;
      errorNotification(payload.response.data.message);
      state.isLoading = false;
    });

    // Edit Task Action
    builder.addCase(EditTaskAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(EditTaskAction.fulfilled, (state, action) => {
      const data = action.payload.data;
      const updated_task = data.data;
      const updated_tasks = state.allTasksDetails.tasks.map((task) => {
        if (task.id == updated_task.id) {
          return {
            ...updated_task,
          };
        }
        return { ...task };
      });
      state.allTasksDetails.tasks = updated_tasks;
      state.allTasksDetails.isLoading = false;
      state.isLoading = false;
      modals.closeAll();
    });

    builder.addCase(EditTaskAction.rejected, (state, action) => {
      const payload = action.payload as ITaskRejectedAction;
      errorNotification(payload.response.data.message);
      state.isLoading = false;
    });

    // Create Task Action
    builder.addCase(CreateTaskAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(CreateTaskAction.fulfilled, (state, action) => {
      const data = action.payload.data;
      const new_task = data.data;
      const new_tasks = [...state.allTasksDetails.tasks, new_task];
      state.allTasksDetails.tasks = new_tasks;
      state.allTasksDetails.isLoading = false;
      state.isLoading = false;
      modals.closeAll();
    });

    builder.addCase(CreateTaskAction.rejected, (state, action) => {
      const payload = action.payload as ITaskRejectedAction;
      errorNotification(payload?.response?.data?.message);
      state.isLoading = false;
    });
  },
});

export default GetAllTasksSlice.reducer;
