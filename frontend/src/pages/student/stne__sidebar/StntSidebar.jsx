import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { RiMenuFoldFill, RiMenuUnfoldFill, RiLogoutCircleLine } from 'react-icons/ri';
import { PiExamFill } from 'react-icons/pi';
import { FaBookBookmark } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { MdAssignmentAdd } from 'react-icons/md';

import './stnt-sidebar.css';

const { Sider, Footer } = Layout;

const StntSidebar = () => {
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
        navigate('/');
        window.history.pushState(null, null, '/');
        window.onpopstate = (event) => {
            event.preventDefault();
            event.stopPropagation();
            navigate('/');
        };
    };

    return (
        <div>
            <Layout
                className="layout-container"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '170vh',
                    backgroundColor: 'white'
                }}
            >
                <Sider
                    className="side__bar"
                    collapsed={collapsed}
                    collapsedWidth={70}
                    width={200} // Set initial width of the sidebar
                    style={{
                        backgroundColor: 'white',
                        transition: '0.3s ease-in-out' // Add transition for width change, padding change, and margin change
                    }}
                >
                    <div
                        className="top-bar"
                        onClick={toggleCollapse}
                        style={{ padding: '10px', cursor: 'pointer', position: "fixed" }}
                    >
                        {collapsed ? (
                            <RiMenuUnfoldFill fontSize={30} />
                        ) : (
                            <RiMenuFoldFill fontSize={30} />
                        )}
                    </div>

                    {/* Menu */}
                    <Menu
                        className="stnt-menu__bar"
                        mode="inline"
                        style={{ width: `${menuWidth}px`, marginTop: "51px", transition: '0.3s ease-in-out', position: "fixed" }} // Set dynamic width
                        items={[
                            {
                                key: '/StudentDashboard',
                                icon: <CgProfile size={collapsed ? '20' : '25'} />,
                                label: <Link to="/StudentDashboard">Profile</Link>,
                            },
                            {
                                key: '/StudentDashboard/Attendance',
                                icon: <FaBookBookmark size={collapsed ? '20' : '25'} />,
                                label: <Link to="/StudentDashboard/stntAttendance">Attendance</Link>,
                            },
                            {
                                key: '/StudentDashboard/Result',
                                icon: <PiExamFill size={collapsed ? '20' : '25'} />,
                                label: <Link to="/StudentDashboard/stntResult">Result</Link>,
                            }, {
                                key: '/StudentDashboard/Assignments',
                                icon: <MdAssignmentAdd size={collapsed ? '20' : '25'} />,
                                label: <Link to="/StudentDashboard/stntassignments">Assignments </Link>,
                            }
                        ]}
                    />
                </Sider>

                {/* Footer */}
                <Footer
                    className="sidebar__footer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        padding: '10px',
                        position: 'fixed',
                        bottom: '20px',
                        margin: '10px',
                        backgroundColor: isHovered ? 'rgb(140, 221, 178)' : 'white', // Set background color for Footer
                        transition: 'background-color 0.3s ease-in-out',
                        borderRadius: '10px',
                    }}
                >
                    <div
                        className="profile-section"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'opacity 0.3s ease-in-out',
                        }}
                    >
                        {collapsed ? (
                            <RiLogoutCircleLine
                                style={{ fontSize: '20px' }}
                                onClick={handleLogout}
                            />
                        ) : (
                            <Link
                                to="/"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textDecoration: 'none',
                                    color: 'black',
                                    transition: 'opacity 0.3s ease-in-out',
                                }}
                            >
                                <RiLogoutCircleLine
                                    style={{ fontSize: '25px', marginRight: '10px' }}
                                    onClick={handleLogout}
                                />
                                <b>Logout</b>
                            </Link>
                        )}
                    </div>
                </Footer>
            </Layout>
        </div>
    );
};

export default StntSidebar;
