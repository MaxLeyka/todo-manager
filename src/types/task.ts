export interface Task {
  id: number;
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
}

export interface TaskFilterParams {
  isImportant?: boolean;
  name_like?: string;
  isCompleted?: boolean;
}

export interface CreateTask {
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
}

export interface UpdateTask {
  name?: string;
  info?: string;
  isImportant?: boolean;
  isCompleted?: boolean;
}
