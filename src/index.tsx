import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from 'src/App';
import { store } from 'src/store/store';

const container = document.getElementById('root');
if (!container) throw new Error('Не найден root-элемент');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
