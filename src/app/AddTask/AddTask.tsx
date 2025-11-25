import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Checkbox, CircularProgress, Snackbar, Alert } from '@mui/material';
import { addTaskSchema } from 'src/app/AddTask/validation.schema';
import { useCreateTaskMutation } from 'src/api/tasksApi';
import { CreateTask } from 'types/task';
import { useToast } from 'src/hooks/useToast';
import {
  MainContainer,
  FormContainer,
  StyledTextField,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
  StyledFormGroup,
  StyledFormControlLabel,
} from 'src/styles/StyledComponents';

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTask>({
    resolver: yupResolver(addTaskSchema),
    defaultValues: {
      name: '',
      info: '',
      isImportant: false,
      isCompleted: false,
    },
  });

  const onSubmit = async (data: CreateTask) => {
    try {
      const taskData: CreateTask = {
        name: data.name,
        info: data.info,
        isImportant: data.isImportant,
        isCompleted: data.isCompleted,
      };

      await createTask(taskData).unwrap();
      showToast('Задача успешно создана', 'success');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      showToast('Ошибка при создании задачи', 'error');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <MainContainer>
      <FormContainer elevation={2}>
        <Typography variant="h1" component="h1" id="add-task-heading" gutterBottom>
          Создать новую задачу
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                fullWidth
                label="Название задачи"
                id="name-input"
                error={!!errors.name}
                helperText={errors.name?.message}
                required
              />
            )}
          />

          <Controller
            name="info"
            control={control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                fullWidth
                label="Описание"
                id="info-textarea"
                multiline
                rows={4}
                error={!!errors.info}
                helperText={errors.info?.message}
                required
              />
            )}
          />

          <StyledFormGroup>
            <Controller
              name="isImportant"
              control={control}
              render={({ field }) => (
                <StyledFormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Важная задача" />
              )}
            />
            <Controller
              name="isCompleted"
              control={control}
              render={({ field }) => (
                <StyledFormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Выполнена" />
              )}
            />
          </StyledFormGroup>

          <ButtonGroup aria-label="Действия формы">
            <SecondaryButton type="button" onClick={handleCancel} variant="outlined" disabled={isLoading}>
              Отмена
            </SecondaryButton>
            <PrimaryButton
              type="submit"
              disabled={isLoading}
              variant="contained"
              startIcon={isLoading ? <CircularProgress size={20} /> : null}>
              {isLoading ? 'Создание...' : 'Создать задачу'}
            </PrimaryButton>
          </ButtonGroup>
        </Box>
      </FormContainer>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={toast.open}
        autoHideDuration={3000}
        onClose={hideToast}>
        <Alert onClose={hideToast} severity={toast.severity} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </MainContainer>
  );
};

export default AddTask;
