import React from 'react';

const AboutPage = () => {
  return (
    <div className="card shadow p-3 mb-5 bg-white rounded">
      <div className="card-body">
        <h2>About Me</h2>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <span className="form-text">Your Name</span>
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <span className="form-text">yourname@example.com</span>
        </div>
        <div className="mb-3">
          <label className="form-label">Contact No:</label>
          <span className="form-text">123-456-7890</span>
        </div>
        <div className="mb-3">
          <label className="form-label">LinkedIn Profile ID:</label>
          <span className="form-text">linkedin.com/in/yourprofile</span>
        </div>
        <div className="mb-3">
          <label className="form-label">Education Details:</label>
          <span className="form-text">MCA from College of Engineering, Guindy</span>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
