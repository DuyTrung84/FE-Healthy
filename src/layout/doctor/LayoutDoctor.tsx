
import { FundProjectionScreenOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

import { Link, Outlet } from 'react-router-dom';
import { useRefreshTokenMutation } from '../../api/share/area';
import { useGetAccountQuery } from '../../api/share/upload';
import { useEffect } from 'react';
import { MdOutlineDateRange } from 'react-icons/md';

const { Header, Content, Sider } = Layout;
type MenuItem = {
    key: string;
    icon: JSX.Element;
    label: string;
    path: string;
    items?: MenuItem[];
};

const LayoutDoctor = () => {

    const [refreshToken] = useRefreshTokenMutation();
    const { data, error } = useGetAccountQuery();
    console.log(data)
    useEffect(() => {
        if (error) {
            if ('status' in error && error.status === 401) {
                refreshToken().unwrap().then((response) => {
                    // Lưu token vào Local Storage
                    localStorage.setItem('token', response.data!.token);
                    localStorage.setItem('rfToken', response.data!.refreshToken);
                    window.location.reload();
                }).catch((error) => {
                    console.error('Error refreshing token:', error);
                });
            }
        }
    }, [error]);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems: MenuItem[] = [
        { key: '1', icon: <FundProjectionScreenOutlined />, label: 'Dashboard', path: '' },
        {
            key: 'account-management',
            icon: <MdOutlineDateRange />,
            label: 'Quản lý đặt lịch',
            path: 'quan-ly-lich-kham',
        },

    ];

    return (
        <Layout className='h-screen'>
            <Sider
                theme='light'
                breakpoint="xl"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <img src="https://cdn.youmed.vn/wp-content/themes/youmed/images/favicon.svg" className="w-14 justify-center flex" alt="" />
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                >
                    {menuItems.map((menuItem) => (
                        menuItem.items ? (
                            <Menu.SubMenu key={menuItem.key} icon={menuItem.icon} title={menuItem.label}>
                                {menuItem.items.map((subItem) => (
                                    <Menu.Item key={subItem.key} icon={subItem.icon}>
                                        <Link to={subItem.path}>{subItem.label}</Link>
                                    </Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        ) : (
                            <Menu.Item key={menuItem.key} icon={menuItem.icon}>
                                <Link to={menuItem.path}>{menuItem.label}</Link>
                            </Menu.Item>
                        )
                    ))}
                </Menu>
            </Sider>
            <Layout className='max-h-screen'>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutDoctor;