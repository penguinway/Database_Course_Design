import React, { useState } from 'react';
import { Layout, Menu, Button, ConfigProvider, Typography } from 'antd';
import {
  BookOutlined,
  UserOutlined,
  TeamOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarChartOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom'; // 引入 Link 组件
import { Outlet } from 'react-router-dom'; // 用于渲染子路由

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const items = [
  { key: 'dashboard', icon: <BarChartOutlined />, label: <Link to="/">系统概览</Link> },
  {
    key: 'employee-management',
    icon: <TeamOutlined />,
    label: <Text>员工管理</Text>,
    children: [
      { key: 'all-employees', label: <Link to="/employee-management/all-employees">所有员工</Link> },
      { key: 'add-employee', label: <Link to="/employee-management/add-employee">添加员工</Link> },
      // { key: 'edit-employee', label: <Link to="/employee-management/edit-employee">修改员工</Link> },
    ],
  },
  {
    key: 'position-records',
    icon: <SolutionOutlined />,
    label: <Text>岗位管理</Text>,
    children: [
      { key: 'all-position', label: <Link to="/position-records/all-position">所有岗位</Link> },
      { key: 'add-position', label: <Link to="/position-records/add-position">添加岗位</Link> },
      // { key: 'edit-position', label: <Link to="/position-records/edit-position">修改岗位</Link> },
    ],
  },
  {
    key: 'education-management',
    icon: <BookOutlined />,
    label: <Text>教育经历管理</Text>,
    children: [
      { key: 'add-education', label: <Link to="/education-management/add-education">添加教育经历</Link> },
      { key: 'edit-education', label: <Link to="/education-management/edit-education">修改教育经历</Link> },
      { key: 'delete-education', label: <Link to="/education-management/delete-education">删除教育经历</Link> },
    ],
  },
  {
    key: 'experience-management',
    icon: <SnippetsOutlined />,
    label: <Text>工作经历管理</Text>,
    children: [
      { key: 'add-experience', label: <Link to="/experience-management/add-experience">添加工作经历</Link> },
      { key: 'edit-experience', label: <Link to="/experience-management/edit-experience">修改工作经历</Link> },
      { key: 'delete-experience', label: <Link to="/experience-management/delete-experience">删除工作经历</Link> },
    ],
  },
  {
    key: 'person-position-management',
    icon: <AuditOutlined />,
    label: <Link to="/person-position-management">人员岗位管理</Link>,
  },
  { key: 'about', icon: <UserOutlined />, label: <Link to="/about">关于系统</Link> },
];

const HomePage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#ff9afc' } }}>
    <Layout style={{ minHeight: '100vh' }}>
      {/* 侧边栏 */}
      <Sider width={256} collapsed={collapsed} onCollapse={toggleCollapsed} theme="light">
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px' }}>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              backgroundColor: '#001529',
              borderColor: '#001529',
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <Menu defaultSelectedKeys={['dashboard']} mode="inline" theme="light" items={items} />
      </Sider>

      {/* 主体内容区域 */}
      <Layout style={{ padding: '0 24px 24px' }}>
        {/* 头部 */}
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div style={{ color: 'white', fontSize: '20px', textAlign: 'center' }}>
            船舶人力资源管理系统
          </div>
        </Header>

        {/* 内容区域 */}
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            maxHeight: 'calc(100vh - 100px - 100px)', // 减去头部和页脚的高度
            overflowY: 'auto', // 开启垂直滚动条
          }}
        >
          <Outlet /> {/* 渲染子路由的内容 */}
        </Content>

        {/* 页脚 */}
        <Footer style={{ textAlign: 'center' }}>© 2024 船舶人力资源管理系统</Footer>
      </Layout>
    </Layout>
    </ConfigProvider>
  );
};

export default HomePage;
