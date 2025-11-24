import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateTaskMutation } from 'src/api/tasksApi';
import { CreateTask } from 'types/task';

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const [createTask] = useCreateTaskMutation();

  const { register, handleSubmit } = useForm<CreateTask>();

  const onSubmit = async (data: CreateTask) => {
    await createTask(data).unwrap();
    navigate('/');
  };

  return (
    <div>
      <h1>Добавить задачу</h1>

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

        <button type="submit">Создать</button>
        <button type="button" onClick={() => navigate('/')}>
          Отмена
        </button>
      </form>
    </div>
  );
};

export default AddTask;
