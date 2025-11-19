export interface Task {
  id: number;
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
}

export interface GetAllTasks {
  isImportant: boolean;
  name_like: string;
  isCompleted: boolean;
}

export interface CreateTask {
  name: string;
  info?: string;
  isImportant: boolean;
  isCompleted: boolean;
}

export interface GetTask {
  id: number;
}

export interface UpdateTask {
  id: number;
}
export interface DeleteTask {
  id: number;
}
export interface Error {
  error: string;
}
