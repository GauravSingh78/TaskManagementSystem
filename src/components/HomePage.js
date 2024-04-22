import React  from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutPage from './AboutPage';
import Layout from './Layout';
import Task from './Task';

const HomePage = () => {
  
    const username = localStorage.getItem('username');
  return (
    <Layout username={username}>
      <Routes>
        <Route path="/" element={<HomeContent username={username && username.toUpperCase()} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/task" element={<Task />} />
        <Route path="/tasklist" element={<Task />} />

      </Routes>
    </Layout>
  );
};

const HomeContent = ({ username }) => {
  return (
    <div>
      <h2>Welcome to the Home Page, {username}</h2>
      {/* Add other content */}
    </div>
  );
};

export default HomePage;
