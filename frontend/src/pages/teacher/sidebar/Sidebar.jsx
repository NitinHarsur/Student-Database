import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import './Sidebar.css'; // Import your CSS file
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri'; // Import icons
import { AiFillHome } from 'react-icons/ai';
import { PiStudentBold, PiExamFill } from 'react-icons/pi';
import { FaBookBookmark, FaUserCheck } from 'react-icons/fa6';
import { HiUserAdd } from 'react-icons/hi';
import { MdPersonRemoveAlt1 } from 'react-icons/md';

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true); // Initially set sidebar to be collapsed

    // Function to toggle the collapsed state
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className='layout-container'>
            {/* Sidebar */}
            <Sider
                className='side__bar'
                collapsed={collapsed}
                collapsedWidth={60}
                width={200}
                style={{ transition: ' 0.3s ease-in-out'}} 
            >

                <div className='top-bar' onClick={toggleCollapse} style={{ padding: '10px', backgroundColor: '#00b4d8', cursor: 'pointer' }}>
                    {collapsed ? (
                        <RiMenuUnfoldFill fontSize={'30px'} />
                    ) : (
                        <RiMenuFoldFill fontSize={'30px'} />
                    )}
                </div>

                {/* Menu */}
                <Menu mode="inline" theme="dark">
                    <Menu.Item key="1" icon={<AiFillHome />}>
                        Home
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<PiStudentBold />} title="Student Manager">
                        <Menu.Item key="2" icon={<HiUserAdd />}>Add Student</Menu.Item>
                        <Menu.Item key="3" icon={<FaUserCheck />}>Update Student</Menu.Item>
                        <Menu.Item key="4" icon={<MdPersonRemoveAlt1 />}>Delete Student</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5" icon={<FaBookBookmark />}>
                        Attendance
                    </Menu.Item>
                    <Menu.Item key="6" icon={<PiExamFill />}>Result</Menu.Item>
                </Menu>
            </Sider>

            {/* Content */}
            <Content className='content-area'>
                {/* Add your main content here */}
            </Content>

      
        </Layout>
    );
};

export default Sidebar;
