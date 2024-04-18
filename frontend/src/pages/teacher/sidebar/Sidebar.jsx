import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import { IoMenu } from 'react-icons/io5';
import { AiFillHome } from 'react-icons/ai';
import { PiStudentBold, PiExamFill } from "react-icons/pi";
import { FaBookBookmark,FaUserCheck  } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
import { MdPersonRemoveAlt1 } from "react-icons/md";


const Side_bar = () => {
  const [showIconsOnly, setShowIconsOnly] = useState(false);

  

  // // Define style objects
  const sidebarStyle = {
    background: 'black',
    padding: '1rem',
    width: showIconsOnly ? '50px' : '200px', // Shrinking width when showIconsOnly is true
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left'
 };

  // const listStyle = {

  //   listStyle: 'none',
  //   padding: '10px',
  //   marginTop: '1rem'
  // };

  // const linkStyle = {    
      
  //   height: '45px',
  //   borderradius: '20px',
  //   backgroundcolor: 'yellow',
  //   textDecoration: 'none',
  //   color: 'black',
  //   display: 'flex',
  //   alignItems: 'center',
  //   marginBottom: '3rem',// Apply margin based on showIconsOnly state
  // };

  // Function to toggle between showing icons with text and just icons
  const toggleShowIconsOnly = () => {
    setShowIconsOnly(!showIconsOnly);
  };

  return (
    <div className="sidebar" style={sidebarStyle}>
      <IoMenu onClick={toggleShowIconsOnly} style={{ color:'darkblue',marginBottom: '2rem', cursor: 'pointer', fontSize: '30px',padding:'10px' }} />
      
      <div className="side_menu_bar" style={{ width: showIconsOnly ? '50px' : '200px' }}>
        <Sidebar style={{ width: showIconsOnly ? '50px' : '200px' }}>
          <Menu>
            <MenuItem icon={<AiFillHome/>} component={<Link to="/TeacherDashBoard" />} >TeacherHome</MenuItem>

            <SubMenu icon={<PiStudentBold/>} label='StudentManager'>
            <MenuItem icon={<HiUserAdd/>} component={<Link to='/TeacherDashBoard/StudentManager/AddStudent'/>}>AddStudent</MenuItem>
            <MenuItem icon={<FaUserCheck/>} component={<Link to="/TeacherDashboard/StudentManager/UpdateStudent"/>}>UpdateStudent</MenuItem>
            <MenuItem icon={<MdPersonRemoveAlt1 />} component={<Link to="/TeacherDashboard/StudentManager/DeleteStudent"/>}>DeleteStudent</MenuItem>
            </SubMenu>

            <MenuItem icon={<FaBookBookmark/>} component={<Link to="/TeacherDashBoard/Attendance" />}>Attendance</MenuItem>

            <MenuItem icon={<PiExamFill/>} component={<Link to="/TeacherDashBoard/Result" />}>Result</MenuItem>
          </Menu>
        </Sidebar>
      </div>

    </div>
  );
};

export default Side_bar;
