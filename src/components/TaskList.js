import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskIds, setTaskIds] = useState([]);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState('');
  const [taskIdToUpdate, setTaskIdToUpdate] = useState(null);

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
      setTaskIds(data.taskid);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks');
    }
  };

  const handleDeleteTask = async () => {
    if (!taskIdToDelete) return;

    const username = localStorage.getItem('username');
    if (!username) {
      console.error('Username not found in localStorage');
      return;
    }

    try {
      const response = await fetch(`/delete-task/${username}/${taskIdToDelete}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      // Refresh tasks after deletion
      fetchTasks();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleShowDeleteModal = (taskId) => {
    setTaskIdToDelete(taskId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskIdToDelete(null);
  };

  const handleUpdateTask = (task, taskId) => {
    setTaskToUpdate(task);
    setTaskIdToUpdate(taskId);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setTaskToUpdate('');
    setTaskIdToUpdate(null);
  };

  const updateTask = async () => {
    if (!taskToUpdate || !taskIdToUpdate) return;
  
    const username = localStorage.getItem('username');
    if (!username) {
      console.error('Username not found in localStorage');
      return;
    }
  
    try {
      const response = await fetch(`/update-task/${username}/${taskIdToUpdate}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: taskToUpdate }),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      fetchTasks();
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  return (
    <div className="container mt-4">
      <h2>Task List</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{task}</span>
            <div>
              <button className="btn btn-danger me-2" onClick={() => handleShowDeleteModal(taskIds[index])}>Delete</button>
              <button className="btn btn-primary" onClick={() => handleUpdateTask(task, taskIds[index])}>Update</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Delete confirmation modal */}
      <div>
        <div className="modal" style={{ display: showDeleteModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={handleCloseDeleteModal}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this task?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteTask}>Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop" style={{ display: showDeleteModal ? 'block' : 'none' }}></div>
      </div>

      {/* Update task modal */}
      <div>
        <div className="modal" style={{ display: showUpdateModal ? 'block' : 'none' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Task</h5>
                <button type="button" className="btn-close" onClick={handleCloseUpdateModal}></button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control" value={taskToUpdate} onChange={(e) => setTaskToUpdate(e.target.value)} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseUpdateModal}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={updateTask}>Update</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop" style={{ display: showUpdateModal ? 'block' : 'none' }}></div>
      </div>
    </div>
  );
};

export default TaskList;
