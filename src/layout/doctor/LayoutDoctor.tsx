
import { DownOutlined, FundProjectionScreenOutlined, LoginOutlined, RollbackOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, MenuProps, Space, theme } from 'antd';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useRefreshTokenMutation } from '../../api/share/area';
import { useGetAccountQuery } from '../../api/share/upload';
import { useEffect } from 'react';
import { MdOutlineDateRange } from 'react-icons/md';
import { Notifn } from '../../utils/Notification';

const { Header, Content, Sider } = Layout;
type MenuItem = {
    key: string;
    icon: JSX.Element;
    label: string;
    path: string;
    items?: MenuItem[];
};

const LayoutDoctor = () => {
    const navigate = useNavigate();
    const [refreshToken] = useRefreshTokenMutation();
    const { data, error } = useGetAccountQuery();

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rfToken');
        localStorage.removeItem('role');
        Notifn("success", "Đăng xuất", "");
        navigate("/login");
    };


    const items: MenuProps['items'] = [
        { label: <button className='mx-2' onClick={handleLogout}><LoginOutlined className='mr-2' />Đăng xuất</button>, key: '2', }
    ];

    return (
        <Layout className='h-screen'>
            <Sider
                theme='light'
                trigger={null} collapsible width={220} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, zIndex: 20 }}
            >
                <div className="flex justify-center items-center"> {/* Thêm các lớp để căn giữa */}
                    <img src="https://cdn.youmed.vn/wp-content/themes/youmed/images/favicon.svg" className="w-14 my-4" alt="" />
                </div>                <Menu
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
            <Layout className='max-h-screen' style={{ marginLeft: 220 }}>
                <Header style={{ padding: 0, background: colorBgContainer }} className='flex justify-end fixed top-0 right-0 z-10 w-full drop-shadow'>
                    <div className='mr-16 flex gap-2'>
                        <p><span className='font-medium text-gray-700'>Xin chào bác sĩ !!  </span> <span className='text-blue-500'>{data?.data?.name}</span></p>
                        <div className='border-l px-4'>
                            <Space wrap size={16} className='mr-2'>
                                <Avatar size={34} src={`${data?.data?.avatar}`} />
                            </Space>
                            <Dropdown menu={{ items }} trigger={['click']}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                        <Link className='border-l px-3' to="/">Quay lại web <RollbackOutlined /></Link>
                    </div>
                </Header>
                <Content style={{ margin: '88px 24px 0' }}>
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