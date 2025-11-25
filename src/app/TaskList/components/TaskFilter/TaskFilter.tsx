import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import useDebounce from 'src/hooks/useDebounce';
import { TaskFilterParams } from 'types/task';
import { TaskFilterProps } from 'app/TaskList/components/TaskFilter/TaskFilter.types';
import { FilterSection, FilterRow } from 'src/styles/StyledComponents';

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
    <FilterSection elevation={1}>
      <Typography variant="h3" component="h3" id="filter-heading" gutterBottom>
        Фильтры и поиск
      </Typography>

      <FilterRow>
        <TextField
          fullWidth
          label="Поиск по названию"
          id="search-input"
          type="text"
          placeholder="Введите название задачи..."
          {...register('name_like')}
          variant="outlined"
        />

        <FormControl fullWidth>
          <InputLabel id="status-select-label">Статус выполнения</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            label="Статус выполнения"
            {...register('isCompleted')}>
            <MenuItem value="all">Все задачи</MenuItem>
            <MenuItem value="active">Активные</MenuItem>
            <MenuItem value="completed">Выполненные</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="importance-select-label">Важность</InputLabel>
          <Select
            labelId="importance-select-label"
            id="importance-select"
            label="Важность"
            {...register('isImportant')}>
            <MenuItem value="all">Все задачи</MenuItem>
            <MenuItem value="important">Важные</MenuItem>
            <MenuItem value="not-important">Неважные</MenuItem>
          </Select>
        </FormControl>
      </FilterRow>
    </FilterSection>
  );
};

export default TaskFilter;
