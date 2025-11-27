import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Snackbar, CircularProgress, Alert } from '@mui/material';
import { useDeleteTaskMutation, useGetAllTasksQuery, useUpdateTaskMutation } from 'src/api/tasksApi';
import { TaskFilterParams } from 'types/task';
import TaskFilter from 'app/TaskList/components/TaskFilter/TaskFilter';
import TaskItem from 'app/TaskList/components/TaskItem/TaskItem';
import TaskSkeleton from 'app/TaskList/components/TaskSkeleton/TaskSkeleton';
import TaskEmpty from 'app/TaskList/components/TaskEmpty/TaskEmpty';
import { useToast } from 'src/hooks/useToast';
import {
  MainContainer,
  PageHeader,
  TaskGrid,
  ErrorAlert,
  RetryButton,
  HiddenHeading,
} from 'src/styles/StyledComponents';

const TaskList: React.FC = () => {
  const [filter, setFilter] = useState<TaskFilterParams>({});
  const { data: tasks, isLoading, isError, refetch } = useGetAllTasksQuery(filter);
  const { toast, showToast, hideToast } = useToast();

  const [patchTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleToggleImportant = async (taskId: number, currentIsImportant: boolean, isCompleted: boolean) => {
    if (isCompleted) return;

    try {
      await patchTask({
        id: taskId,
        data: { isImportant: !currentIsImportant },
      }).unwrap();
      showToast(!currentIsImportant ? 'Задача отмечена как важная' : 'Задача больше не важная', 'success');
    } catch (error) {
      showToast('Ошибка при изменении важности задачи', 'error');
    }
  };

  const handleToggleCompleted = async (taskId: number, currentIsCompleted: boolean) => {
    try {
      await patchTask({
        id: taskId,
        data: { isCompleted: !currentIsCompleted },
      }).unwrap();
      showToast(!currentIsCompleted ? 'Задача выполнена' : 'Задача активна', 'success');
    } catch (error) {
      showToast('Ошибка при изменении статуса задачи', 'error');
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId).unwrap();
      showToast('Задача успешно удалена', 'success');
    } catch (error) {
      showToast('Ошибка при удалении задачи', 'error');
    }
  };

  const handleFilterChange = useCallback((newFilter: TaskFilterParams) => {
    setFilter(newFilter);
  }, []);

  if (isLoading) {
    return (
      <MainContainer>
        <PageHeader>
          <Typography variant="h1" component="h1">
            Задачи
          </Typography>
          <Button component={Link} to="/add" variant="contained" disabled startIcon={<CircularProgress size={16} />}>
            Создать задачу
          </Button>
        </PageHeader>
        <TaskFilter onFilterChange={handleFilterChange} />
        <TaskGrid>
          {Array.from({ length: 6 }).map((_, index) => (
            <TaskSkeleton key={index} />
          ))}
        </TaskGrid>
      </MainContainer>
    );
  }

  if (isError) {
    return (
      <MainContainer>
        <PageHeader>
          <Typography variant="h1" component="h1">
            Задачи
          </Typography>
          <Button component={Link} to="/add" variant="contained">
            Создать задачу
          </Button>
        </PageHeader>
        <ErrorAlert severity="error">
          <Typography variant="h6" gutterBottom>
            Произошла ошибка при загрузке задач
          </Typography>
          <RetryButton onClick={() => refetch()} variant="outlined" color="inherit">
            Попробовать снова
          </RetryButton>
        </ErrorAlert>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <PageHeader>
        <Typography variant="h1" component="h1">
          Задачи
        </Typography>
        <Button component={Link} to="/add" variant="contained">
          Создать задачу
        </Button>
      </PageHeader>

      <TaskFilter onFilterChange={handleFilterChange} />

      <Box aria-labelledby="tasks-heading">
        <HiddenHeading variant="h2" id="tasks-heading">
          Список задач
        </HiddenHeading>

        {!tasks || tasks.length === 0 ? (
          <TaskEmpty />
        ) : (
          <TaskGrid>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onToggleImportant={handleToggleImportant}
                onToggleCompleted={handleToggleCompleted}
              />
            ))}
          </TaskGrid>
        )}
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={toast.open}
        autoHideDuration={3000}
        onClose={hideToast}>
        <Alert onClose={hideToast} severity={toast.severity} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </MainContainer>
  );
};

export default TaskList;
