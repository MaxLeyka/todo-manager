import React from 'react';
import { Link } from 'react-router-dom';
import { TaskItemProps } from './TaskItem.types';

const TaskItem = ({ task, onDelete, onToggleImportant, onToggleCompleted }: TaskItemProps) => {
  return (
    <div>
      <span>{task.id}</span>
      <button onClick={() => onToggleImportant(task.id, task)}>{task.isImportant ? 'Важно' : 'Не важно'}</button>
      <button onClick={() => onToggleCompleted(task.id, task)}>
        {task.isCompleted ? 'Выполнено' : 'Не выполнено'}
      </button>
      <span>{task.name}</span>
      <span>{task.info}</span>
      <Link to={`/edit/${task.id}`}>
        <button>Редактировать</button>
      </Link>
      <button onClick={() => onDelete(task.id)}>Удалить</button>
    </div>
  );
};

export default TaskItem;
