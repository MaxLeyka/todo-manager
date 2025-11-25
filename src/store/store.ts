import { configureStore } from '@reduxjs/toolkit';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import { tasksApi } from 'api/tasksApi';

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware).concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
