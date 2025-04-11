import React from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../components/TaskList';

const TaskFilter = () => {
  const { status } = useParams();

  return (
    <div>
      <h1>Tareas {status === 'completed' ? 'Completadas' : 'Pendientes'}</h1>
      <TaskList status={status} />
    </div>
  );
};

export default TaskFilter;