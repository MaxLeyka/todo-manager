import * as yup from 'yup';

export const editTaskSchema = yup.object({
  name: yup.string().required('Название обязательно'),
  info: yup.string().required('Описание обязательно'),
  isImportant: yup.boolean().test('completed-important', 'Выполненная задача не может быть важной', function (value) {
    const { isCompleted } = this.parent;
    return !isCompleted || !value;
  }),
  isCompleted: yup.boolean(),
});
