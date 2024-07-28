import { useAuth } from "../contexts/AuthContext";
import React, { useState } from 'react';
import {
	UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { AiOutlineUpload, AiOutlineVideoCamera } from 'react-icons/ai';
import { NavLink, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const { user } = useAuth();
	if (!user || user.role !== "admin") {
		return <h1>Ban khong co quyen vao trang nay!</h1>;
	}
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['1']}
					items={[
						{
							key: '1',
							icon: <UserOutlined />,
							label: <NavLink to={'/admin'}>Dashboard</NavLink>,
						},
						{
							key: '2',
							icon: < AiOutlineVideoCamera />,
							label: <NavLink to={'/admin/categories'}>Danh mục</NavLink>,
						},
						{
							key: '3',
							icon: <AiOutlineUpload />,
							label: <NavLink to={'/'}>Home</NavLink>,
						},
					]}
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }} />
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						<main>
							<Outlet />
						</main>	
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©{new Date().getFullYear()} Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
};

export default App;