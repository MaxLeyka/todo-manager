import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteTaskMutation, useGetAllTasksQuery, useUpdateTaskMutation } from 'src/api/tasksApi';
import { TaskFilterParams } from 'types/task';
import TaskFilter from 'app/TaskList/components/TaskFilter/TaskFilter';
import TaskItem from 'app/TaskList/components/TaskItem/TaskItem';
import TaskSkeleton from 'app/TaskList/components/TaskSkeleton/TaskSkeleton';
import TaskEmpty from 'app/TaskList/components/TaskEmpty/TaskEmpty';

const TaskList: React.FC = () => {
  const [filter, setFilter] = useState<TaskFilterParams>({});
  const { data: tasks, isLoading, isError, error, refetch } = useGetAllTasksQuery(filter);

  const [patchTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleToggleImportant = useCallback(
    (taskId: number, currentIsImportant: boolean, isCompleted: boolean) => {
      if (isCompleted) {
        return;
      }
      patchTask({
        id: taskId,
        data: { isImportant: !currentIsImportant },
      });
    },
    [patchTask]
  );

  const handleToggleCompleted = useCallback(
    (taskId: number, currentIsCompleted: boolean) => {
      patchTask({
        id: taskId,
        data: { isCompleted: !currentIsCompleted },
      });
    },
    [patchTask]
  );

  const handleDelete = useCallback(
    (taskId: number) => {
      deleteTask(taskId);
    },
    [deleteTask]
  );

  if (isLoading) {
    return (
      <main aria-live="polite" aria-busy="true">
        <header>
          <h1>Задачи</h1>
          <Link to="/add">
            <button disabled>Создать новое</button>
          </Link>
        </header>
        <TaskFilter onFilterChange={setFilter} />
        <div role="status" aria-label="Загрузка задач">
          {Array.from({ length: 5 }).map((_, index) => (
            <TaskSkeleton key={index} />
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <header>
          <h1>Задачи</h1>
          <Link to="/add">
            <button>Создать новое</button>
          </Link>
        </header>
        <div role="alert" aria-live="assertive">
          <p>Произошла ошибка при загрузке задач</p>
          <button onClick={refetch}>Попробовать снова</button>
          <details>
            <summary>Подробности ошибки</summary>
            {error?.toString()}
          </details>
        </div>
      </main>
    );
  }

  return (
    <main>
      <header>
        <h1>Задачи</h1>
        <Link to="/add">
          <button>Создать новое</button>
        </Link>
      </header>

      <TaskFilter onFilterChange={setFilter} />

      <section aria-labelledby="tasks-heading">
        <h2 id="tasks-heading" className="visually-hidden">
          Список задач
        </h2>

        {!tasks || tasks.length === 0 ? (
          <TaskEmpty />
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map((task) => (
              <li key={task.id}>
                <TaskItem
                  task={task}
                  onDelete={handleDelete}
                  onToggleImportant={() => handleToggleImportant(task.id, task.isImportant, task.isCompleted)}
                  onToggleCompleted={() => handleToggleCompleted(task.id, task.isCompleted)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default TaskList;
