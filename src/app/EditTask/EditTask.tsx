import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useGetTaskQuery, useUpdateTaskMutation } from 'src/api/tasksApi';
import { UpdateTask } from 'types/task';

const taskSchema = yup.object({
  name: yup.string().required('Название обязательно'),
  info: yup.string(),
  isImportant: yup.boolean(),
  isCompleted: yup.boolean(),
});

const EditTask: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const {
    data: task,
    isLoading: isLoadingTask,
    error: loadError,
  } = useGetTaskQuery(Number(taskId), {
    skip: !taskId,
  });

  const [updateTask, { isLoading: isUpdating, error: updateError }] = useUpdateTaskMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateTask>({
    resolver: yupResolver(taskSchema),
  });

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

  const onSubmit = async (data: UpdateTask) => {
    if (!taskId) return;

    try {
      await updateTask({
        id: Number(taskId),
        data: data,
      }).unwrap();
      navigate('/');
    } catch (error) {
      //todo добавить обработку ошибок
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!taskId) {
    return (
      <main>
        <h1>Ошибка</h1>
        <p>ID задачи не указан</p>
        <button onClick={() => navigate('/')}>На главную</button>
      </main>
    );
  }

  if (isLoadingTask) {
    return (
      <main aria-live="polite" aria-busy="true">
        <h1>Загрузка задачи...</h1>
      </main>
    );
  }

  if (loadError || !task) {
    return (
      <main>
        <h1>Ошибка</h1>
        <p>Задача не найдена</p>
        <button onClick={() => navigate('/')}>На главную</button>
      </main>
    );
  }

  return (
    <main aria-labelledby="edit-task-heading">
      <h1 id="edit-task-heading">Редактировать задачу #{taskId}</h1>

      {updateError && (
        <div role="alert" aria-live="assertive">
          Произошла ошибка при обновлении задачи. Попробуйте еще раз.
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
          <button type="submit" disabled={isUpdating}>
            {isUpdating ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
          <button type="button" onClick={handleCancel}>
            Отмена
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditTask;
