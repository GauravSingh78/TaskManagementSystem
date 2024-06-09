import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh", position: "relative" }}>
      <div className="background-image" style={{ position: "absolute",  width: "200%", height: "100%", backgroundImage: `url(/task.png)`, opacity: 0.2 }}></div>
      <div className="card shadow p-5 mb-7 bg-white rounded text-center" style={{ width: "400px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Task Management Web Application</h2>
          <p className="card-text mb-4">Please login or register to continue.</p>
          <div className="mb-3 d-grid gap-2">
            <Link to="/login" className="btn btn-primary ">Login</Link>
          </div>
          <div className="d-grid gap-2 mb-3">
            <Link to="/register" className="btn btn-secondary ">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
