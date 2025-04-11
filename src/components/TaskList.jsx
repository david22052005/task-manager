import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './TaskList.scss'; // Archivo de estilos en Sass

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estado para el formulario
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCompleted, setNewTaskCompleted] = useState(false);

  // Obtener la ruta actual
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const filterType = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las tareas. Por favor, intenta nuevamente.');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación del título
    if (!newTaskTitle.trim()) {
      alert('El título no puede estar vacío.');
      return;
    }

    // Crear nueva tarea
    const newTask = {
      title: newTaskTitle,
      completed: newTaskCompleted,
    };

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTask);

      // Agregar la nueva tarea al estado local
      setTasks([response.data, ...tasks]);

      // Limpiar el formulario
      setNewTaskTitle('');
      setNewTaskCompleted(false);
    } catch (err) {
      setError('Error al crear la tarea. Por favor, intenta nuevamente.');
    }
  };

  // Filtrar tareas según la ruta
  const filteredTasks =
    filterType === 'completed'
      ? tasks.filter((task) => task.completed) // Solo tareas completadas
      : filterType === 'pending'
      ? tasks.filter((task) => !task.completed) // Solo tareas pendientes
      : tasks; // Todas las tareas

  if (loading) {
    return <p>Cargando tareas...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="task-container">
      {/* Formulario de creación */}
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Crear Nueva Tarea</h2>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Escribe el título de la tarea"
          />
        </div>
        <div className="form-group">
          <label htmlFor="completed">Estado:</label>
          <select
            id="completed"
            value={newTaskCompleted}
            onChange={(e) => setNewTaskCompleted(e.target.value === 'true')}
          >
            <option value="false">Pendiente</option>
            <option value="true">Completada</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Crear Tarea
        </button>
      </form>

      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <span>{task.title}</span>
              <span>{task.completed ? 'Completada' : 'Pendiente'}</span>
            </div>
          ))
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;