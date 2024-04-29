import React from 'react';
import StntSidebar from './stne__sidebar/StntSidebar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const StudentDashboard = () => {
  return (
    <div className="Main__Stntdashboard d-flex ">
      <div
        className="__stnt__sidebar flex-shrink-0" // Adds margin to the left, top, and bottom
        style={{
          boxShadow: '3px 0 6px rgba(0, 0, 0, 0.1)', // Adds box shadow to the sidebar
        }}
      >
        {/* Sidebar */}
        <StntSidebar />
      </div>

      <div className="__Stnt__dashborad flex-grow-1">
        {/* Main content area */}
        StudentDashboard
      </div>
    </div>
  );
};

export default StudentDashboard;
