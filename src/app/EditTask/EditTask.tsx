import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetTaskQuery, useUpdateTaskMutation } from 'src/api/tasksApi';
import { UpdateTask } from 'types/task';

const EditTask: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const { data: task, isLoading } = useGetTaskQuery(Number(taskId));
  const [updateTask] = useUpdateTaskMutation();

  const { register, handleSubmit, reset } = useForm<UpdateTask>();

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

    await updateTask({
      id: Number(taskId),
      data: data,
    }).unwrap();
    navigate('/');
  };

  if (!taskId) return <div>ID задачи не указан</div>;
  if (isLoading) return <div>Загрузка...</div>;
  if (!task) return <div>Задача не найдена</div>;

  return (
    <div>
      <h1>Редактировать задачу #{taskId}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Название задачи*</label>
          <input type="text" {...register('name', { required: true })} />
        </div>

        <div>
          <label>Описание</label>
          <textarea {...register('info')} />
        </div>

        <div>
          <label>
            <input type="checkbox" {...register('isImportant')} />
            Важная задача
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" {...register('isCompleted')} />
            Выполнена
          </label>
        </div>

        <button type="submit">Сохранить</button>
        <button type="button" onClick={() => navigate('/')}>
          Отмена
        </button>
      </form>
    </div>
  );
};

export default EditTask;
