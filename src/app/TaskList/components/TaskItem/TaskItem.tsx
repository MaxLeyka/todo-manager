import React from 'react';
import { Link } from 'react-router-dom';
import { Chip, Tooltip } from '@mui/material';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { TaskItemProps } from './TaskItem.types';
import {
  StyledCard,
  TaskActions,
  ActionIconButton,
  TaskHeader,
  TaskChipsContainer,
  TaskTitle,
  TaskDescription,
  TaskCardContent,
} from 'src/styles/StyledComponents';

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
    <StyledCard>
      <TaskCardContent>
        <TaskHeader>
          <Tooltip title={task.name} enterDelay={500}>
            <TaskTitle variant="h3" id={`task-title-${task.id}`} isCompleted={task.isCompleted}>
              {task.name}
            </TaskTitle>
          </Tooltip>
          <Chip label={`#${task.id}`} size="small" variant="outlined" color="default" />
        </TaskHeader>

        {task.info && (
          <Tooltip title={task.info} enterDelay={500}>
            <TaskDescription variant="body2" color="text.secondary" isCompleted={task.isCompleted}>
              {task.info}
            </TaskDescription>
          </Tooltip>
        )}

        <TaskChipsContainer>
          {task.isCompleted && (
            <Chip icon={<CheckCircleIcon />} label="Выполнено" size="small" color="success" variant="filled" />
          )}
          {task.isImportant && <Chip icon={<StarIcon />} label="Важно" size="small" color="warning" variant="filled" />}
        </TaskChipsContainer>

        <TaskActions role="group" aria-label="Управление задачей">
          <Tooltip
            title={
              task.isCompleted
                ? 'Нельзя изменить важность выполненной задачи'
                : task.isImportant
                ? 'Снять отметку важности'
                : 'Отметить как важную'
            }>
            <span>
              <ActionIconButton
                onClick={handleToggleImportant}
                disabled={task.isCompleted}
                aria-pressed={task.isImportant}
                aria-label={
                  task.isCompleted
                    ? 'Нельзя изменить важность выполненной задачи'
                    : task.isImportant
                    ? 'Снять отметку важности'
                    : 'Отметить как важную'
                }
                color={task.isImportant ? 'warning' : 'default'}>
                {task.isImportant ? <StarIcon /> : <StarBorderIcon />}
              </ActionIconButton>
            </span>
          </Tooltip>

          <Tooltip title={task.isCompleted ? 'Отметить как невыполненную' : 'Отметить как выполненную'}>
            <ActionIconButton
              onClick={handleToggleCompleted}
              aria-pressed={task.isCompleted}
              aria-label={task.isCompleted ? 'Отметить как невыполненную' : 'Отметить как выполненную'}
              color={task.isCompleted ? 'success' : 'default'}>
              {task.isCompleted ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </ActionIconButton>
          </Tooltip>

          <Tooltip title="Редактировать задачу">
            <Link
              to={`/edit/${task.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              aria-label={`Редактировать задачу "${task.name}"`}>
              <ActionIconButton color="primary">
                <EditIcon />
              </ActionIconButton>
            </Link>
          </Tooltip>

          <Tooltip title="Удалить задачу">
            <ActionIconButton onClick={handleDelete} aria-label={`Удалить задачу "${task.name}"`} color="error">
              <DeleteIcon />
            </ActionIconButton>
          </Tooltip>
        </TaskActions>
      </TaskCardContent>
    </StyledCard>
  );
};

export default TaskItem;
