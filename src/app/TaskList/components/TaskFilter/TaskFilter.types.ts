import { TaskFilterParams } from 'types/task';

export interface TaskFilterProps {
  onFilterChange: (filters: TaskFilterParams) => void;
}
