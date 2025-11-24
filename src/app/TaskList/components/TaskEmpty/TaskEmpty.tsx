import React from 'react';
import { Link } from 'react-router-dom';

const TaskEmpty: React.FC = () => {
  return (
    <section aria-labelledby="empty-heading" role="status" aria-live="polite">
      <h2 id="empty-heading">Задачи не найдены</h2>
      <p>Попробуйте изменить фильтры или создать новую задачу.</p>
      <Link to="/add">
        <button>Создать первую задачу</button>
      </Link>
    </section>
  );
};

export default TaskEmpty;
