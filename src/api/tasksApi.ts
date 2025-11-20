import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API } from 'constants/api';
import { CreateTask, Task, TaskFilterParams, UpdateTask } from 'types/task';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getAllTasks: builder.query<Task[], TaskFilterParams>({
      query: (params) => ({
        url: 'tasks',
        method: 'GET',
        params: params,
      }),
      providesTags: ['Task'],
    }),
    getTask: builder.query<Task, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'GET',
      }),
      providesTags: ['Task'],
    }),
    createTask: builder.mutation<Task, CreateTask>({
      query: (data) => ({
        url: 'tasks',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation<Task, { id: number; data: UpdateTask }>({
      query: ({ id, data }) => ({
        url: `tasks/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation<Task, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
