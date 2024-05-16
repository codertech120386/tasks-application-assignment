import endpoints from './endpoints';
import httpClient from './httpClient';
import { RegisterRequest } from '../features/auth/register/register.interfaces';
import { LoginRequest } from '../features/auth/login/login.interfaces';
import {
  IDeleteTaskRequest,
  IGetAllTasksRequest,
  IEditTaskRequest,
  ITaskCreateEditRequest,
} from '../features/tasks/task.interfaces';

const server = {
  login: {
    loadLogin: async (payload: LoginRequest) =>
      await httpClient.post(endpoints.login.resource, payload),
  },

  register: {
    loadRegister: async (payload: RegisterRequest) =>
      await httpClient.post(endpoints.register.resource, payload),
  },

  tasks: {
    loadAllTasks: async (payload: IGetAllTasksRequest) => {
      let url = `${endpoints.tasks.resource}?task_status=${payload.status}&`;

      if (payload.limit) {
        url += `limit=${payload.limit}&`;
      }

      if (payload.page) {
        url += `page=${payload.page}&`;
      }
      if (payload.sort) {
        url += `sort=${payload.sort}&`;
      }
      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }
      return await httpClient.get(url);
    },
    loadDeleteTask: async (payload: IDeleteTaskRequest) => {
      const url = `${endpoints.tasks.resource}/${payload.id}`;
      return await httpClient.delete(url);
    },
    loadEditTask: async (payload: ITaskCreateEditRequest) => {
      const url = `${endpoints.tasks.resource}/${payload.id}`;
      return await httpClient.patch(url, payload);
    },
    loadCreateTask: async (payload: ITaskCreateEditRequest) => {
      const url = endpoints.tasks.resource;
      return await httpClient.post(url, payload);
    },
  },
};

export default server;
