import { TaskFilterParams } from 'types/task';

export interface TaskFilterProps {
  onFilterChange: (filters: TaskFilterParams) => void;
}

export interface FilterFormData {
  name_like: string;
  isCompleted: 'all' | 'completed' | 'active';
  isImportant: 'all' | 'important' | 'not-important';
}
