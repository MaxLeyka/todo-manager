import * as yup from 'yup';

export const filterSchema = yup.object({
  name_like: yup.string(),
  isCompleted: yup.string().oneOf(['all', 'completed', 'active']),
  isImportant: yup.string().oneOf(['all', 'important', 'not-important']),
});
