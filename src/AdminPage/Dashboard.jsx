import React from 'react';
import SidebarAdmin from '../Component/SidebarAdmin';

const Dashboard = () => {
  return (
    <div className="wrapper" style={{ height: '100vh' }}>
      <div className="row" style={{ height: '100vh' }}>
        <div className="col-2">
          <SidebarAdmin current={'Dashboard'} />
        </div>
        <div className=" col-10 d-flex justify-content-center" style={{ padding: '0 32px' }}>
          <div className="col-12">
            <div>
              <h1>Dashboard</h1>
              <p>This is the Dashboard page.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
