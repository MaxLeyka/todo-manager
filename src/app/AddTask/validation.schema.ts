import * as yup from 'yup';

export const addTaskSchema = yup.object({
  name: yup.string().required('Название обязательно'),
  info: yup.string().required('Описание обязательно'),
  isImportant: yup.boolean(),
  isCompleted: yup.boolean(),
});
