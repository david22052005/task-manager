// src/components/TaskFilter.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TaskFilter = () => {
  return (
    <div className="filter-buttons">
      <Link to="/">
        <button>Todos</button>
      </Link>
      <Link to="/tasks/pending">
        <button>Pendientes</button>
      </Link>
      <Link to="/tasks/completed">
        <button>Completadas</button>
      </Link>
    </div>
  );
};

export default TaskFilter;