import { Task } from 'types/task';

export interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggleImportant: (id: number, currentIsImportant: boolean, isCompleted: boolean) => void;
  onToggleCompleted: (id: number, currentIsCompleted: boolean) => void;
}
