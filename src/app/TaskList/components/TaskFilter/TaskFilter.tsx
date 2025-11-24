import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useDebounce from 'src/hooks/useDebounce';
import { TaskFilterParams } from 'types/task';
import { TaskFilterProps } from 'app/TaskList/components/TaskFilter/TaskFilter.types';

const filterSchema = yup.object({
  name_like: yup.string(),
  isCompleted: yup.string().oneOf(['all', 'completed', 'active']),
  isImportant: yup.string().oneOf(['all', 'important', 'not-important']),
});

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const { register, watch } = useForm({
    resolver: yupResolver(filterSchema),
    defaultValues: {
      name_like: '',
      isCompleted: 'all',
      isImportant: 'all',
    },
  });

  const formValues = watch();
  const debouncedSearch = useDebounce(formValues.name_like, 500);

  React.useEffect(() => {
    const filters: TaskFilterParams = {};

    if (debouncedSearch.trim()) {
      filters.name_like = debouncedSearch;
    }

    if (formValues.isCompleted === 'completed') {
      filters.isCompleted = true;
    } else if (formValues.isCompleted === 'active') {
      filters.isCompleted = false;
    }

    if (formValues.isImportant === 'important') {
      filters.isImportant = true;
    } else if (formValues.isImportant === 'not-important') {
      filters.isImportant = false;
    }

    onFilterChange(filters);
  }, [debouncedSearch, formValues.isCompleted, formValues.isImportant, onFilterChange]);

  return (
    <section aria-labelledby="filter-heading">
      <h3 id="filter-heading">Фильтры и поиск</h3>

      <div role="group" aria-labelledby="search-label">
        <label id="search-label" htmlFor="search-input">
          Поиск по названию:
        </label>
        <input id="search-input" type="text" placeholder="Введите название задачи..." {...register('name_like')} />
      </div>

      <div role="group" aria-labelledby="status-label">
        <label id="status-label" htmlFor="status-select">
          Статус выполнения:
        </label>
        <select id="status-select" {...register('isCompleted')}>
          <option value="all">Все задачи</option>
          <option value="active">Активные</option>
          <option value="completed">Выполненные</option>
        </select>
      </div>

      <div role="group" aria-labelledby="importance-label">
        <label id="importance-label" htmlFor="importance-select">
          Важность:
        </label>
        <select id="importance-select" {...register('isImportant')}>
          <option value="all">Все задачи</option>
          <option value="important">Важные</option>
          <option value="not-important">Неважные</option>
        </select>
      </div>
    </section>
  );
};

export default TaskFilter;
