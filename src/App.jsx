import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Lista de Tareas</h1>
        <TaskFilter />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/:status" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;