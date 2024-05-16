import { createAsyncThunk } from '@reduxjs/toolkit';
import server from '../../api/server';
import {
  IGetAllTasksRequest,
  IGetAllTasksResponse,
  IDeleteTaskRequest,
  IDeleteTaskResponse,
  ITaskCreateEditRequest,
  ITaskCreateEditResponse,
} from './task.interfaces';

export const GetAllTasksAction = createAsyncThunk<
  { data: IGetAllTasksResponse },
  { requestPayload: IGetAllTasksRequest }
>('all-tasks', async ({ requestPayload }, { rejectWithValue }) => {
  try {
    const { data } = await server.tasks.loadAllTasks(requestPayload);
    return { data };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const DeleteTaskAction = createAsyncThunk<
  { data: IDeleteTaskResponse },
  { requestPayload: IDeleteTaskRequest }
>('delete-task', async ({ requestPayload }, { rejectWithValue }) => {
  try {
    const { data } = await server.tasks.loadDeleteTask(requestPayload);
    return { data };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const EditTaskAction = createAsyncThunk<
  { data: ITaskCreateEditResponse },
  { requestPayload: ITaskCreateEditRequest }
>('edit-task', async ({ requestPayload }, { rejectWithValue }) => {
  try {
    const { data } = await server.tasks.loadEditTask(requestPayload);
    return { data };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const CreateTaskAction = createAsyncThunk<
  { data: ITaskCreateEditResponse },
  { requestPayload: ITaskCreateEditRequest }
>('create-task', async ({ requestPayload }, { rejectWithValue }) => {
  try {
    const { data } = await server.tasks.loadCreateTask(requestPayload);
    return { data };
  } catch (error) {
    return rejectWithValue(error);
  }
});
