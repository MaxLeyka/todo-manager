import { Task } from 'types/task';

export interface TaskItemProps {
  task: {
    id: number;
    name: string;
    info: string;
    isImportant: boolean;
    isCompleted: boolean;
  };
  onDelete: (id: number) => void;
  onToggleImportant: (id: number, currentData: Task) => void;
  onToggleCompleted: (id: number, currentData: Task) => void;
}
