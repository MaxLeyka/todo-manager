export const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  console.group('Redux Action:', action.type);
  console.log('Payload:', action.payload);
  console.log('State before:', store.getState());
  const result = next(action);
  console.log('State after:', store.getState());
  console.groupEnd();
  return result;
};
