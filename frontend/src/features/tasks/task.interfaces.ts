export enum TaskStatuses {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export enum TaskStatusesWithAll {
  All = 'All',
  'To Do' = 'To Do',
  'In Progress' = 'In Progress',
  Done = 'Done',
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatuses;
  created: string;
  updated: string;
}

export interface IGetAllTasksRequest {
  status: string;
  sort?: string;
  limit?: number;
  page?: number;
}

export interface IGetAllTasksResponse {
  data: {
    tasks: ITask[];
    totalPages: number;
    activePage: number;
  };
}

export interface ITaskState {
  isLoading: boolean;
  allTasksDetails: {
    isLoading: boolean;
    tasks: IGetAllTasksResponse['data']['tasks'];
    totalPages: number;
    activePage?: number;
  };
}

export interface ITaskRejectedAction {
  response: {
    data: {
      message: string;
    };
  };
}

export interface IDeleteTaskRequest {
  id: number;
}

export interface IDeleteTaskResponse {
  data: {
    message: string;
    id: number;
  };
}

export interface IEditTaskRequest {
  id: number;
}

export interface IEditTaskResponse {
  data: {
    task: ITask;
  };
}

export interface ITaskCreateEditRequest {
  id?: number;
  title: string;
  description: string;
  status: TaskStatuses;
}

export interface ITaskCreateEditResponse {
  data: {
    task: ITask;
  };
}
