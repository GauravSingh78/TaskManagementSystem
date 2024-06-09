import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    // Handle logout logic
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* <span className="navbar-brand">{username && username.toUpperCase()}</span> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/home" className="nav-link" style={{ color: 'navy', fontWeight: 'bold' }}>{username && username.toUpperCase()}</Link>
              </li>
              
              <li className="nav-item">
                <Link to="/task" className="nav-link">Task</Link>
              </li>
              <li className="nav-item">
                <Link to="/tasklist" className="nav-link">Task-List</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
            </ul>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
