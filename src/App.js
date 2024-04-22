import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import Layout from './components/Layout';
import Task from './components/Task';
import TaskList from './components/TaskList';

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/home/*" element={<HomePage username={username} />} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/task" element={<Layout><Task /></Layout>} />
        <Route path="/tasklist" element={<Layout><TaskList /></Layout>} />

      </Routes>
    </Router>
  );
};

export default App;
