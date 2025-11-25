import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Checkbox, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useGetTaskQuery, useUpdateTaskMutation } from 'src/api/tasksApi';
import { useToast } from 'src/hooks/useToast';
import { editTaskSchema } from 'src/app/EditTask/validation.schema';
import {
  MainContainer,
  FormContainer,
  StyledTextField,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
  StyledFormGroup,
  StyledFormControlLabel,
  ErrorText,
  LoadingContainer,
} from 'src/styles/StyledComponents';
import { editTaskData } from 'app/EditTask/EditTask.types';

const EditTask: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const {
    data: task,
    isLoading: isLoadingTask,
    error: loadError,
  } = useGetTaskQuery(Number(taskId), {
    skip: !taskId,
  });

  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<editTaskData>({
    resolver: yupResolver(editTaskSchema),
  });

  const isCompleted = watch('isCompleted');

  useEffect(() => {
    if (task) {
      reset({
        name: task.name,
        info: task.info,
        isImportant: task.isImportant,
        isCompleted: task.isCompleted,
      });
    }
  }, [task, reset]);

  const onSubmit = async (data: editTaskData) => {
    if (!taskId) return;

    try {
      const updateData: editTaskData = {
        name: data.name,
        info: data.info,
        isImportant: data.isImportant,
        isCompleted: data.isCompleted,
      };

      await updateTask({
        id: Number(taskId),
        data: updateData,
      }).unwrap();
      showToast('Задача успешно обновлена', 'success');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      showToast('Ошибка при обновлении задачи', 'error');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!taskId) {
    return (
      <MainContainer>
        <FormContainer elevation={2}>
          <Typography variant="h1" component="h1" gutterBottom>
            Ошибка
          </Typography>
          <ErrorText variant="body1">ID задачи не указан</ErrorText>
          <Button variant="contained" onClick={() => navigate('/')}>
            На главную
          </Button>
        </FormContainer>
      </MainContainer>
    );
  }

  if (isLoadingTask) {
    return (
      <MainContainer>
        <FormContainer elevation={2}>
          <LoadingContainer>
            <CircularProgress />
            <Typography variant="h1" component="h1">
              Загрузка задачи...
            </Typography>
          </LoadingContainer>
        </FormContainer>
      </MainContainer>
    );
  }

  if (loadError || !task) {
    return (
      <MainContainer>
        <FormContainer elevation={2}>
          <Typography variant="h1" component="h1" gutterBottom>
            Ошибка
          </Typography>
          <ErrorText variant="body1">Задача не найдена</ErrorText>
          <Button variant="contained" onClick={() => navigate('/')}>
            На главную
          </Button>
        </FormContainer>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <FormContainer elevation={2}>
        <Typography variant="h1" component="h1" id="edit-task-heading" gutterBottom>
          Редактировать задачу #{taskId}
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
                <StyledFormControlLabel
                  control={<Checkbox {...field} checked={field.value} disabled={isCompleted} />}
                  label="Важная задача"
                />
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

          {errors.isImportant && (
            <ErrorText variant="body2" color="error">
              {errors.isImportant.message}
            </ErrorText>
          )}

          <ButtonGroup aria-label="Действия формы">
            <SecondaryButton type="button" onClick={handleCancel} variant="outlined" disabled={isUpdating}>
              Отмена
            </SecondaryButton>
            <PrimaryButton
              type="submit"
              disabled={isUpdating}
              variant="contained"
              startIcon={isUpdating ? <CircularProgress size={20} /> : null}>
              {isUpdating ? 'Сохранение...' : 'Сохранить изменения'}
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

export default EditTask;
