import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu,Avatar} from 'antd';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';
import { PiStudentBold, PiExamFill } from 'react-icons/pi';
import { FaBookBookmark, FaUserCheck } from 'react-icons/fa6';
import { HiUserAdd } from 'react-icons/hi';
import { MdPersonRemoveAlt1 } from 'react-icons/md';
import { UserOutlined } from '@ant-design/icons';
import './Sidebar.css';
import { Footer } from 'antd/es/layout/layout';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);

    // Function to toggle the collapsed state
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className='layout-container' style={{display:'flex',flexDirection:'column', backgroundColor: '#00b4d8',height:'100vh'}}>
            {/* Sidebar */}
            <Sider 
                className='side__bar'
                collapsed={collapsed}
                collapsedWidth={70}
                width={200}
                style={{ height: '100vh', transition: '0.3s ease-in-out', backgroundColor: '#00b4d8' }}
            >
                <div className='top-bar' onClick={toggleCollapse} style={{ padding: '10px', backgroundColor: '#00b4d8', cursor: 'pointer' }}>
                    {collapsed ? (
                        <RiMenuUnfoldFill fontSize={30} />
                    ) : (
                        <div className='menu-icon-end' style={{display:'flex',justifyContent:'flex-end'}}>
                            {/* Container for the menu fold icon */}
                            <RiMenuFoldFill fontSize={30} />
                        </div>
                    )}
                </div>

                {/* Menu */}
                <Menu
                    className='menu__bar'
                    mode="inline"
                    theme="dark"  
                    style={{ paddingTop: '50px', paddingBottom: '50px' }}>

                    <Menu.Item key="/TeacherDashboard"icon={<AiFillHome />}style={{ justifyContent: 'center' }}>
                        <Link to="/TeacherDashboard">Home</Link>
                    </Menu.Item>

                    <SubMenu key="sub1" icon={<PiStudentBold />} title="Student Manager" >

                        <Menu.Item key="/TeacherDashboard/StudentManager/AddStudent" icon={<HiUserAdd />}>
                            <Link to="/TeacherDashboard/StudentManager/AddStudent">Add Student</Link>
                        </Menu.Item>

                        <Menu.Item key="/TeacherDashboard/StudentManager/UpdateStudent" icon={<FaUserCheck />}>
                            <Link to="/TeacherDashboard/StudentManager/UpdateStudent">Update Student</Link>
                        </Menu.Item>

                        <Menu.Item key="/TeacherDashboard/StudentManager/DeleteStudent" icon={<MdPersonRemoveAlt1 />}>
                            <Link to="/TeacherDashboard/StudentManager/DeleteStudent">Delete Student</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="/TeacherDashboard/Attendance" icon={<FaBookBookmark />} >
                        <Link to="/TeacherDashboard/Attendance">Attendance</Link>
                    </Menu.Item>

                    <Menu.Item key="/TeacherDashboard/Result" icon={<PiExamFill/>} >
                        <Link to="/TeacherDashboard/Result">Result</Link>
                    </Menu.Item>
                </Menu>
                    {/* Footer */}
              
            </Sider>
            <Footer
    style={{
        padding: 0,
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        backgroundColor: '#00b4d8',
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
        <Link to="/TeacherDashboard/TeacherProfile" style={{
            display: collapsed ? 'none' : 'flex', // Hide the link when collapsed
            alignItems: 'center',
            textDecoration: 'none',
            color: 'black',
            transition: 'opacity 0.3s ease-in-out', // Apply transition to opacity
            opacity: collapsed ? 0 : 1, // Control the visibility with opacity
        }}>
            <UserOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
            <b>Profile</b>
        </Link>

        {/* Display the UserOutlined icon when collapsed */}
        {collapsed && (
            <UserOutlined style={{ fontSize: '20px', transition: '0.3s ease-in-out' }} />
        )}
    </div>
</Footer>



        </Layout>
    );
};

export default Sidebar;
