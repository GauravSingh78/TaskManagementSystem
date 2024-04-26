import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data);
      alert("Registered successfully");
      navigate('/');
      // Redirect to home page or display success message
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: "400px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Register</h2>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mb-3">
            <button className="btn btn-primary" onClick={handleRegister}>Register</button>
          </div>
          <p className="text-center mt-3">Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login here</Link></p>
          <p className="text-center mt-3"> <Link to="/">Home</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
