import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { RiMenuFoldFill, RiMenuUnfoldFill,RiLogoutCircleLine } from 'react-icons/ri';
import {  PiExamFill } from 'react-icons/pi';
import { FaBookBookmark } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';

import './sidebar.css';

const { Sider, Footer } = Layout;

const StntSidebar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate();

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Layout
            className="layout-container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                backgroundColor: 'white'
               // Set background color for Layout
            }}
        >
            <Sider
                className="side__bar"
                collapsed={collapsed}
                collapsedWidth={70}
                width={200}
                style={{
                    height: '100vh',
                    transition: '0.3s ease-in-out',
                    backgroundColor: 'white', // Set background color for Sider
                }}
            >
                <div className="top-bar" onClick={toggleCollapse} style={{ padding: '10px', cursor: 'pointer' }}>
                    {collapsed ? (
                        <RiMenuUnfoldFill fontSize={30} />
                    ) : (
                        <div className="menu-icon-end" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <RiMenuFoldFill fontSize={30} />
                        </div>
                    )}
                </div>

                {/* Menu */}
                <Menu
                    className="menu__bar"
                    mode="inline"
                    
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
                    position: 'absolute',
                    bottom: '20px',
                    margin: '10px',
                    backgroundColor: isHovered ? 'rgb(140, 221, 178)': 'white', // Set background color for Footer
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
                        <RiLogoutCircleLine style={{ fontSize: '20px' }}  onClick={() => navigate('/')}/>
                    ) : (
                        <Link to="/" style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'black',
                            transition: 'opacity 0.3s ease-in-out',
                        }}>
                            <RiLogoutCircleLine style={{ fontSize: '25px', marginRight: '10px' }} />
                            <b  onClick={() => navigate('/ ')}>logout</b>
                        </Link>
                    )}
                </div>
            </Footer>
        </Layout>
    );
};

export default StntSidebar;
