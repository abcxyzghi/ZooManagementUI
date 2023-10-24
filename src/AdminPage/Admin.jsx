import React, { useState } from 'react';
import StaffManager from './StaffManager';
import Cage from './Cage';
import DashBoard from './Dashboard';
import Expert from './Expert';
import { Link, Outlet } from 'react-router-dom';
import './App2.css';
function App2() {
  return (
    <div className="App">
      <div className="sidebar">
        <h2>Welcome Admin!</h2>
        <ul>
          <lu>
            <Link to="/admin/dashboard">DashBoard</Link>
          </lu>
          <lu>
            <Link to="/admin/staff-manager">Staff Manager</Link>
          </lu>
          <lu>
            <Link to="/admin/cages">Cages</Link>
          </lu>
          <lu>
            <Link to="/admin/expert">Expert</Link>
          </lu>
          <lu>
            <Link to="/App1">Back</Link>
          </lu>
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App2;
