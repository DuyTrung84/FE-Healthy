import { Link } from "react-router-dom"
import { Button, Table, Space, Dropdown, Modal, Tag, Select, Input, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineDelete } from "react-icons/ai";
import { ExclamationCircleFilled, MoreOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Notifn } from "../../../components/Notification";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { IAccount } from "../../../interface/Account";
import { useDeleteAccountMutation, useGetAllAccountMutation, useGetRoleQuery } from "../../../api/admin/Account";
import { Option } from "antd/es/mentions";
import { useEffect } from "react";

const { confirm } = Modal;
const AccountManage = () => {

    const [searchAccount, { data, isLoading }] = useGetAllAccountMutation();
    const [deleteAccount] = useDeleteAccountMutation();
    const { data: selectRole, isLoading: loadingRole } = useGetRoleQuery();

    useEffect(() => {
        // Gọi API để tìm kiếm tài khoản với giá trị ban đầu
        searchAccount({ keyword: 'A', role: 'ADMIN', page: 0, resultLimit: 10 });
    }, []);

    const showDeleteConfirm = (id: string | undefined) => {
        if (id !== undefined) {
            confirm({
                title: 'Xác nhận xoá',
                icon: <ExclamationCircleFilled />,
                content: 'Bạn có muốn xoá tài khoản này không??',
                okText: 'Có',
                cancelText: 'Không',
                okType: 'danger',
                async onOk() {
                    try {
                        await deleteAccount(id);
                        Notifn("success", "Thành công", "Đã xoá tài khoản thành công");
                    } catch (error) {
                        Notifn("error", "Lỗi", "Lỗi xoá");
                    }
                },
            });
        }
    };

    const handleSearch = (values: any) => {
        searchAccount({
            keyword: values.keyword,
            role: values.role,
            page: 0,
            resultLimit: 10
        });
    };

    const columns: ColumnsType<IAccount> = [
        {
            title: 'STT',
            key: 'index',
            width: 10,
            render: (_text, _record, index) => index + 1,
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Email tài khoản',
            dataIndex: 'email',
            key: 'email',

        },
        {
            title: 'Email tài khoản',
            dataIndex: 'email',
            key: 'email',

        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => {
                let tagColor: string;
                if (role === 'ADMIN') {
                    tagColor = 'gold';
                } else if (role === 'USER') {
                    tagColor = 'blue';
                } else if (role === 'DOCTOR') {
                    tagColor = 'cyan';
                } else {
                    tagColor = 'default_color';
                }
                return <Tag color={tagColor}>{role}</Tag>;
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === '1' ? 'red' : 'green'}>
                    {status === '1' ? 'INACTIVE' : 'ACTIVE'}
                </Tag>
            ),
        },
        {
            title: 'Ảnh',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar: string) => (
                <img src={`http://${avatar}`} alt="Ảnh" style={{ maxWidth: '80px', maxHeight: '80px' }} />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (_text, record) => {
                const items: MenuItemType[] = [
                    {
                        key: 'delete',
                        label: (
                            <button onClick={() => { showDeleteConfirm(record.id) }}>
                                <p className=""><AiOutlineDelete className="inline-block mr-2 text-xl " />Xoá</p>
                            </button>
                        ),
                    },
                ];
                return (
                    <div className="flex gap-2">
                        <Space size="middle">
                            <Dropdown menu={{ items }} trigger={['click']}>
                                <a>
                                    <MoreOutlined />
                                </a>
                            </Dropdown>
                        </Space>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý tài khoản</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to="/admin/them-chuyen-khoa">Tạo tài khoản</Link>
                </Button>
            </div>
            <Form onFinish={handleSearch}>
                <div>
                    <div className="my-8 grid grid-cols-3 gap-10 mx-8">
                        <div>
                            <p className="font-medium text-[17px] my-1.5 text-gray-700">Tên người dùng:</p>
                            <Form.Item name="keyword">
                                <Input placeholder="Nhập tên người dùng" />
                            </Form.Item>
                        </div>
                        <div>
                            <p className="font-medium text-[17px] my-1.5 text-gray-700">Vai trò:</p>
                            <Form.Item name="role">
                                <Select defaultValue="" className="w-full" loading={loadingRole}>
                                    <Option value="">---Select---</Option>
                                    {selectRole?.data?.map(role => (
                                        <Option key={role.value} value={role.value}>{role.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="mb-8 float-right mr-8 flex items-center gap-3">
                        <Button icon={<ReloadOutlined />}>Đặt lại</Button>
                        <Button type="primary" icon={<SearchOutlined />} className="bg-blue-600" htmlType="submit">
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
            </Form>
            <Table
                style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}
                columns={columns}
                dataSource={data?.data?.data}
                loading={isLoading}
                className="h-[90%]" />
        </div>
    )
}

export default AccountManage