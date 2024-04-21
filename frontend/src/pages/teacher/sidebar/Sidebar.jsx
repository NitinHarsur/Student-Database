import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';
import { PiStudentBold, PiExamFill } from 'react-icons/pi';
import { FaBookBookmark, FaUserCheck } from 'react-icons/fa6';
import { HiUserAdd } from 'react-icons/hi';
import { MdPersonRemoveAlt1 } from 'react-icons/md';
import { UserOutlined } from '@ant-design/icons';
import './Sidebar.css';

const { Sider, Footer } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className="layout-container" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', height: '100vh' }}>
            <Sider
                className="side__bar"
                collapsed={collapsed}
                collapsedWidth={70}
                width={200}
                style={{ height: '100vh', transition: '0.3s ease-in-out', backgroundColor: '#00b4d8' }}
            >
                <div className="top-bar" onClick={toggleCollapse} style={{ padding: '10px', backgroundColor: 'white', cursor: 'pointer' }}>
                    {collapsed ? (
                        <RiMenuUnfoldFill fontSize={30} />
                    ) : (
                        <div className="menu-icon-end" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <RiMenuFoldFill fontSize={30} />
                        </div>
                    )}
                </div>

                {/* Menu */}
                <Menu className='menu__bar'
                    mode="inline"
                    theme="light"
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
                    ]}
                />
            </Sider>

            {/* Footer */}
            <Footer
                style={{
                    padding: 0,
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    backgroundColor: 'white',
                }}
            >
                <div
                    className="profile-section"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'opacity 0.3s ease-in-out', // Transition effect for smooth appearance
                    }}
                >
                    {collapsed ? (
                        <UserOutlined style={{ fontSize: '20px' }} />
                    ) : (
                        <Link to="/TeacherDashboard/TeacherProfile" style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'black',
                            transition: 'opacity 0.3s ease-in-out',
                        }}>
                            <UserOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
                            <b>Profile</b>
                        </Link>
                    )}
                </div>
            </Footer>
        </Layout>
    );
};

export default Sidebar;
