import React, { useState } from 'react';
import { useDeleteTaskMutation, useGetAllTasksQuery, useUpdateTaskMutation } from 'src/api/tasksApi';
import { TaskFilterParams, UpdateTask } from 'types/task';
import TaskFilter from 'app/TaskList/components/TaskFilter/TaskFilter';
import TaskItem from 'app/TaskList/components/TaskItem/TaskItem';

const TaskList = () => {
  const [filter, setFilter] = useState<TaskFilterParams>({});
  const { data } = useGetAllTasksQuery(filter);
  const [patchTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleToggleImportant = (taskId: number, data: UpdateTask) => {
    patchTask({
      id: taskId,
      data: { ...data, isImportant: !data.isImportant },
    });
  };
  const handleToggleCompleted = (taskId: number, data: UpdateTask) => {
    patchTask({
      id: taskId,
      data: { ...data, isCompleted: !data.isCompleted },
    });
  };
  const handleDelete = (taskId: number) => {
    deleteTask(taskId);
  };
  return (
    <div>
      {data?.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onToggleImportant={() => handleToggleImportant(task.id, task)}
          onToggleCompleted={() => handleToggleCompleted(task.id, task)}
        />
      ))}
    </div>
  );
};

export default TaskList;
