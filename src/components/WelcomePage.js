import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: "400px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Welcome to our Website!</h2>
          <p className="card-text text-center mb-4">Please login or register to continue.</p>
          <div className="d-flex justify-content-center">
            <Link to="/login" className="btn btn-primary mr-2">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
            <Link to="/home" className="btn btn-secondary">Home</Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
