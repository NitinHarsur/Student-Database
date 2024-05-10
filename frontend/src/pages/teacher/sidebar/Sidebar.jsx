import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { RiMenuFoldFill, RiMenuUnfoldFill, RiLogoutCircleLine } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';
import { PiStudentBold, PiExamFill, PiUserListFill } from 'react-icons/pi';
import { FaBookBookmark, FaUserCheck } from 'react-icons/fa6';
import { HiUserAdd } from 'react-icons/hi';
import { MdPersonRemoveAlt1,MdAssignmentAdd } from 'react-icons/md';

import './Sidebar.css';

const { Sider, Footer } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [menuWidth, setMenuWidth] = useState(70); // Initial width of the menu items
    const navigate = useNavigate();


    const toggleCollapse = () => {
        setCollapsed(!collapsed);
        setMenuWidth(collapsed ? 200 : 60); // Adjust width based on collapse state
    };

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleLogout = () => {
        // Perform any additional logout actions if needed
    
        // Redirect to the home page
        navigate('/');
    
        // Push a new state to the history stack for the home page
        window.history.pushState(null, null, '/');
    
        // Optionally, add an event listener to prevent the user from navigating back using the back button
        // If the user attempts to navigate back, prevent the action
        window.onpopstate = (event) => {
            event.preventDefault();
            event.stopPropagation();
            // Optionally, navigate back to the home page if needed
            navigate('/');
        };
    };
    
    return (
        <Layout className="layout-container" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', height: '400vh' }}>
            <Sider
                className="side__bar"
                collapsed={collapsed}
                collapsedWidth={70}
                width={200}
                style={{
                    backgroundColor: 'white',
                    transition: 'width 0.3s ease-in-out, padding 0.3s ease-in-out, margin 0.3s ease-in-out' // Add transition for width change, padding change, and margin change
                }}
            >
                <div className="top-bar" onClick={toggleCollapse} style={{ padding: '10px', cursor: 'pointer', position: "fixed"}}>
                    {collapsed ? (
                         <RiMenuUnfoldFill fontSize={30} />
                        ) : (
                            <RiMenuFoldFill fontSize={30} />
                        )}
                </div>

                {/* Menu */}
                <Menu className='menu__bar'
                    mode="inline"
                    theme="light"
                    style={{ width: `${menuWidth}px`, marginTop: "51px", transition: 'background-color 0.3s ease-in-out', position: "fixed" }} // Set dynamic width
                    items={[
                        {
                            key: '/TeacherDashboard',
                            icon: <AiFillHome size={collapsed ? '20' : '25'} />,
                            label: <Link to="/TeacherDashboard">Home</Link>,
                        },
                        {
                            key: 'sub1',
                            icon: <PiStudentBold size={collapsed ? '20' : '25'} />,
                            label: 'Student Manager',
                            children: [
                                {
                                    key: '/TeacherDashboard/StudentManager/AddStudent',
                                    icon: <HiUserAdd size={collapsed ? '20' : '25'} />,
                                    label: <Link to="/TeacherDashboard/StudentManager/AddStudent">Add Student</Link>,
                                },
                                {
                                    key: '/TeacherDashboard/StudentManager/UpdateStudent',
                                    icon: <FaUserCheck size={collapsed ? '20' : '25'} />,
                                    label: <Link to="/TeacherDashboard/StudentManager/UpdateStudent">Update Student</Link>,
                                },
                                {
                                    key: '/TeacherDashboard/StudentManager/DeleteStudent',
                                    icon: <MdPersonRemoveAlt1 size={collapsed ? '20' : '25'} />,
                                    label: <Link to="/TeacherDashboard/StudentManager/DeleteStudent">Delete Student</Link>,
                                },
                            ],
                        },
                        {
                            key: '/TeacherDashboard/Attendance',
                            icon: <FaBookBookmark size={collapsed ? '20' : '25'} />,
                            label: <Link to="/TeacherDashboard/Attendance">Attendance</Link>,
                        },
                        {
                            key: '/TeacherDashboard/Result',
                            icon: <PiExamFill size={collapsed ? '20' : '25'} />,
                            label: <Link to="/TeacherDashboard/Result">Result</Link>,
                        },
                        {
                            key: '/TeacherDashboard/StudentsList',
                            icon: <PiUserListFill size={collapsed ? '20' : '25'} />,
                            label: <Link to="/TeacherDashboard/StudentsList">StudentsList</Link>,
                        },
                        {
                            key: '/TeacherDashboard/Assignments',
                            icon: <MdAssignmentAdd size={collapsed ? '20' : '25'} />,
                            label: <Link to="/TeacherDashboard/Assignments">Assignment</Link>,
                        }
                    ]}
                />
            </Sider>

            {/* Footer */}
            <Footer
                className='sidebar__footer'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    padding: '10px',
                    position: 'fixed',
                    bottom: '20px',
                    margin: '10px',
                    backgroundColor: isHovered ? '#00b4d8' : 'white',
                    transition: 'background-color 0.3s ease-in-out',
                    borderRadius: '10px'
                }}onClick={handleLogout}
            >
                <div
                    className="logout-section"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'opacity 0.3s ease-in-out',
                    }}
                >
                    {collapsed ? (
                        <RiLogoutCircleLine style={{ fontSize: '20px', cursor: 'pointer' }}   />
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                color: 'black',
                                transition: 'opacity 0.3s ease-in-out',
                            }}
                            
                        >
                            <RiLogoutCircleLine style={{ fontSize: '25px', marginRight: '10px' }}   />
                            <b  >Log Out</b>
                        </div>
                    )}
                </div>
            </Footer>
        </Layout>
    );
};

export default Sidebar;
