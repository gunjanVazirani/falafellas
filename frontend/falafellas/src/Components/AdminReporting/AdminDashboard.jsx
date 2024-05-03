import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './AdminDashboard.css'; // CSS file for styling

function AdminDashboard() {
  // Sample user data
  const userData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' }
  ];

  // Sample module data
  const moduleData = [
    { id: 1, title: 'Module 1', description: 'Lorem ipsum dolor sit amet' },
    { id: 2, title: 'Module 2', description: 'Consectetur adipiscing elit' },
    { id: 3, title: 'Module 3', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' }
  ];

  // Sample course data
  const courseData = [
    { id: 1, title: 'Course 1' },
    { id: 2, title: 'Course 2' },
    { id: 3, title: 'Course 3' }
  ];

  return (
    <div className="admin-dashboard">
      <div className="box-container">
        {/* Users Box */}
        <div className="box">
          <h3>Users</h3>
          <p>{userData.length}</p>
        </div>
        {/* Modules Box */}
        <div className="box">
          <h3>Modules</h3>
          <p>{moduleData.length}</p>
        </div>
        {/* Courses Box */}
        <div className="box">
          <h3>Courses</h3>
          <p>{courseData.length}</p>
        </div>
      </div>
      {/* Charts */}
      <div className="charts">
        <div>
          <h3>User Growth</h3>
          <BarChart width={400} height={300} data={userData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="id" fill="#8884d8" />
          </BarChart>
        </div>
        <div>
          <h3>Module Growth</h3>
          <BarChart width={400} height={300} data={moduleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="id" fill="#82ca9d" />
          </BarChart>
        </div>
        <div>
          <h3>Course Growth</h3>
          <BarChart width={400} height={300} data={courseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="id" fill="#ffc658" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
