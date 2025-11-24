import React from 'react';
import { Link } from 'react-router-dom';
import { TaskItemProps } from './TaskItem.types';

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleImportant, onToggleCompleted }) => {
  const handleToggleImportant = () => {
    onToggleImportant(task.id, task.isImportant, task.isCompleted);
  };

  const handleToggleCompleted = () => {
    onToggleCompleted(task.id, task.isCompleted);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <article aria-labelledby={`task-title-${task.id}`}>
      <div>
        <h3 id={`task-title-${task.id}`}>
          {task.name} {task.isCompleted && '(Выполнено)'} {task.isImportant && '(Важно)'}
        </h3>
        <span>#{task.id}</span>
      </div>

      {task.info && <p>{task.info}</p>}

      <div role="group" aria-label="Управление задачей">
        <button
          onClick={handleToggleImportant}
          disabled={task.isCompleted}
          aria-pressed={task.isImportant}
          aria-label={
            task.isCompleted
              ? 'Нельзя изменить важность выполненной задачи'
              : task.isImportant
              ? 'Снять отметку важности'
              : 'Отметить как важную'
          }>
          {task.isImportant ? 'Важно' : 'Не важно'}
        </button>

        <button
          onClick={handleToggleCompleted}
          aria-pressed={task.isCompleted}
          aria-label={task.isCompleted ? 'Отметить как невыполненную' : 'Отметить как выполненную'}>
          {task.isCompleted ? 'Выполнено' : 'Не выполнено'}
        </button>

        <Link to={`/edit/${task.id}`} aria-label={`Редактировать задачу "${task.name}"`}>
          <button>Редактировать</button>
        </Link>

        <button onClick={handleDelete} aria-label={`Удалить задачу "${task.name}"`}>
          Удалить
        </button>
      </div>
    </article>
  );
};

export default TaskItem;
