import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
      console.error('Username not found in localStorage');
      return;
    }

    try {
      const response = await fetch(`/tasks/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Task List</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item">
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
