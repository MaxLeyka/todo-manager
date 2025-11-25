import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import useDebounce from 'src/hooks/useDebounce';
import { TaskFilterParams } from 'types/task';
import { FilterFormData, TaskFilterProps } from 'app/TaskList/components/TaskFilter/TaskFilter.types';
import { filterSchema } from 'src/app/TaskList/components/TaskFilter/validation.schema';
import { FilterSection, FilterRow } from 'src/styles/StyledComponents';

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const { control, watch } = useForm<FilterFormData>({
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
        <Controller
          name="name_like"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Поиск по названию"
              id="search-input"
              type="text"
              placeholder="Введите название задачи..."
              variant="outlined"
            />
          )}
        />

        <Controller
          name="isCompleted"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Статус выполнения</InputLabel>
              <Select {...field} labelId="status-select-label" id="status-select" label="Статус выполнения">
                <MenuItem value="all">Все задачи</MenuItem>
                <MenuItem value="active">Активные</MenuItem>
                <MenuItem value="completed">Выполненные</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="isImportant"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="importance-select-label">Важность</InputLabel>
              <Select {...field} labelId="importance-select-label" id="importance-select" label="Важность">
                <MenuItem value="all">Все задачи</MenuItem>
                <MenuItem value="important">Важные</MenuItem>
                <MenuItem value="not-important">Неважные</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </FilterRow>
    </FilterSection>
  );
};

export default TaskFilter;
