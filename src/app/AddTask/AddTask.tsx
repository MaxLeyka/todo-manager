import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useCreateTaskMutation } from 'src/api/tasksApi';
import { CreateTask } from 'types/task';

const taskSchema = yup.object({
  name: yup.string().required('Название обязательно'),
  info: yup.string(),
  isImportant: yup.boolean().default(false),
  isCompleted: yup.boolean().default(false),
});

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const [createTask, { isLoading, error: apiError }] = useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTask>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      isImportant: false,
      isCompleted: false,
    },
  });

  const onSubmit = async (data: CreateTask) => {
    try {
      await createTask(data).unwrap();
      navigate('/');
    } catch (error) {
      console.log('Ошибка создания задачи:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <main aria-labelledby="add-task-heading">
      <h1 id="add-task-heading">Добавить задачу</h1>

      {apiError && (
        <div role="alert" aria-live="assertive">
          Произошла ошибка при создании задачи. Попробуйте еще раз.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div role="group" aria-labelledby="name-label">
          <label id="name-label" htmlFor="name-input">
            Название задачи*
          </label>
          <input
            id="name-input"
            type="text"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          {errors.name && (
            <span id="name-error" role="alert">
              {errors.name.message}
            </span>
          )}
        </div>

        <div role="group" aria-labelledby="info-label">
          <label id="info-label" htmlFor="info-textarea">
            Описание
          </label>
          <textarea id="info-textarea" {...register('info')} />
        </div>

        <div role="group">
          <label>
            <input type="checkbox" {...register('isImportant')} />
            Важная задача
          </label>
        </div>

        <div role="group">
          <label>
            <input type="checkbox" {...register('isCompleted')} />
            Выполнена
          </label>
        </div>

        <div role="group" aria-label="Действия формы">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Создание...' : 'Создать задачу'}
          </button>
          <button type="button" onClick={handleCancel}>
            Отмена
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddTask;
