import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ReportsDashboard.css'; // CSS file for styling

function ReportsDashboard() {
  // Sample data for demonstration
  const data = [
    { name: 'January', users: 400, modules: 240, courses: 240 },
    { name: 'February', users: 300, modules: 139, courses: 221 },
    { name: 'March', users: 200, modules: 980, courses: 229 },
    { name: 'April', users: 278, modules: 390, courses: 200 },
    { name: 'May', users: 189, modules: 480, courses: 218 },
    { name: 'June', users: 239, modules: 380, courses: 250 },
    { name: 'July', users: 349, modules: 430, courses: 210 },
    { name: 'August', users: 400, modules: 240, courses: 240 },
    { name: 'September', users: 300, modules: 139, courses: 221 },
    { name: 'October', users: 200, modules: 980, courses: 229 },
    { name: 'November', users: 278, modules: 390, courses: 200 },
    { name: 'December', users: 189, modules: 480, courses: 218 }
  ];

  return (
    <div className="reports-dashboard">
      <h2 className='heading'>Data Reports</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" />
            <Bar dataKey="modules" fill="#82ca9d" />
            <Bar dataKey="courses" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ReportsDashboard;
