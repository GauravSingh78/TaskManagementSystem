import React, { useState } from 'react';

const Task = () => {
  const [task, setTask] = useState('');
  
  
  const username = localStorage.getItem('username');

  
  const handleAddTask = async () => {
    try {
      const response = await fetch('/add-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, task }),
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      
      setTask('');
      alert("Task added successfully...")
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Add Task</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-primary" type="button" onClick={handleAddTask}>Add Task</button>
      </div>
      
    </div>
  );
};

export default Task;
