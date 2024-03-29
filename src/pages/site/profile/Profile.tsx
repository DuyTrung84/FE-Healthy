import { Layout, Menu, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect } from 'react'
import { ImProfile } from 'react-icons/im'
import { MdPostAdd } from 'react-icons/md'
import { Link, Outlet } from 'react-router-dom';

interface MenuItem {
    key: React.Key;
    icon?: React.ReactNode;
    children?: MenuItem[];
    label: React.ReactNode;
}

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items: MenuItem[] = [
    getItem('Danh sách hồ sơ', '/ho-so-kham-benh', <ImProfile />),
    getItem('Thêm hồ sơ', '/ho-so-kham-benh/them', <MdPostAdd />),
];

const Profile = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Content style={{ padding: '0 20px' }} className='max-w-screen-xl my-8'>
            <Layout style={{ background: colorBgContainer }}>
                <Sider style={{ background: colorBgContainer, margin: '0px 0px 0px 120px' }} width={200}>
                    <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
                        {items.map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={`${item.key}`}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Content style={{ minHeight: 350, maxHeight: 600 }} className='leading-8 ml-10 scroll-m-1 overflow-y-auto'>
                    <Outlet />
                </Content>
            </Layout>
        </Content>
    )
}

export default Profile