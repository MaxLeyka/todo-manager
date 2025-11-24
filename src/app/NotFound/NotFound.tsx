import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <main aria-labelledby="not-found-heading">
      <h1 id="not-found-heading">Ошибка 404 - страница не найдена</h1>
      <p>Запрашиваемая страница не существует.</p>
      <Link to="/">
        <button>Перейти на главную</button>
      </Link>
    </main>
  );
};

export default NotFound;
