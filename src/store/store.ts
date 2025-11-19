import { configureStore } from '@reduxjs/toolkit';
import { tasksApi } from 'api/tasksApi';

export const store = configureStore({
  reducer: {
    tasksApi: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
