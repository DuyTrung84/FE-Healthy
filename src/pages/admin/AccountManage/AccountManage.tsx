import { Link } from "react-router-dom"
import { Button, Table, Space, Dropdown, Modal, Tag, Select, Input, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { ExclamationCircleFilled, MoreOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Notifn } from "../../../components/Notification";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { IAccount } from "../../../interface/Account";
import { useDeleteAccountMutation, useGetAllAccountMutation, useGetRoleQuery } from "../../../api/admin/Account";
import { Option } from "antd/es/mentions";
import { useEffect } from "react";

const { confirm } = Modal;
const AccountManage = () => {
    const [form] = Form.useForm();
    const [searchAccount, { data, isLoading }] = useGetAllAccountMutation();
    const [deleteAccount] = useDeleteAccountMutation();
    const { data: selectRole, isLoading: loadingRole } = useGetRoleQuery();

    useEffect(() => {
        // Gọi API để tìm kiếm tài khoản với giá trị ban đầu
        searchAccount({ keyword: null, role: null, page: 0, resultLimit: 10 });
    }, []);

    const showDeleteConfirm = (id: string | undefined, status: string) => {
        if (id !== undefined) {
            const contentMessage = status === "1"
                ? 'Bạn có muốn chuyển trạng thái tài khoản này sang Active không??'
                : 'Bạn có muốn chuyển trạng thái tài khoản này sang Inactive không??';
            confirm({
                title: 'Xác nhận xoá',
                icon: <ExclamationCircleFilled />,
                content: contentMessage,
                okText: 'Có',
                cancelText: 'Không',
                okType: 'danger',
                async onOk() {
                    try {
                        await deleteAccount({ id, status });
                        Notifn("success", "Thành công", "Đã chuyển trạng thái tài khoản thành công!");
                        form.submit();
                    } catch (error) {
                        Notifn("error", "Lỗi", "Lỗi khoá");
                    }
                },
            });
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSearch = (values: any) => {
        searchAccount({
            keyword: values.keyword,
            role: values.role,
            page: 0,
            resultLimit: 10
        });
    };

    const handleReset = () => {
        form.resetFields();
        searchAccount({ keyword: null, role: null, page: 0, resultLimit: 10 });
    };

    const handlePaginationChange = (currentPage: number, pageSize?: number) => {
        searchAccount({
            keyword: form.getFieldValue('keyword'),
            role: form.getFieldValue('role'),
            page: currentPage - 1, // Trừ 1 vì API thường sử dụng index bắt đầu từ 0
            resultLimit: pageSize || 10, // Số lượng mục trên mỗi trang
        });
    };
    const columns: ColumnsType<IAccount> = [
        {
            title: 'STT',
            key: 'index',
            width: 60,
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
            },
            width: 100
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === "0" ? 'red' : 'green'}>
                    {status === "0" ? 'INACTIVE' : 'ACTIVE'}
                </Tag>
            ),
            width: 100
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
                        key: record.status === "1" ? 'active' : 'inactive',
                        label: (
                            <button onClick={() => { showDeleteConfirm(record.id, record.status === "1" ? "0" : "1") }}>
                                <p className="">
                                    {record.status === "1" ? <AiOutlineLock className="inline-block mr-2 text-xl" /> : <AiOutlineUnlock className="inline-block mr-2 text-xl" />}
                                    {record.status === "1" ? 'Inactive' : 'Active'}
                                </p>
                            </button>
                        ),
                    }
                ];
                return (
                    <div className="flex gap-2">
                        <Space size="middle">
                            <Dropdown menu={{ items }} trigger={['hover']}>
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
                <Button type="primary" className="bg-blue-600">
                    <Link to="/admin/them-tai-khoan">Tạo tài khoản</Link>
                </Button>
            </div>
            <Form onFinish={handleSearch} form={form}>
                <div>
                    <div className="mb-8 grid grid-cols-3 gap-10 mx-8">
                        <div>
                            <p className="font-medium text-[17px] my-1.5 text-gray-700">Tên người dùng:</p>
                            <Form.Item name="keyword">
                                <Input placeholder="Nhập tên người dùng" />
                            </Form.Item>
                        </div>
                        <div>
                            <p className="font-medium text-[17px] my-1.5 text-gray-700">Vai trò:</p>
                            <Form.Item name="role">
                                <Select placeholder="---Select---" className="w-full" loading={loadingRole}>
                                    <Select.Option value="">All</Select.Option>
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {selectRole?.data?.map((role: any) => (
                                        <Option key={role.value} value={role.value}>{role.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="mb-8 float-right mr-8 flex items-center gap-3">
                        <Button icon={<ReloadOutlined />} onClick={handleReset}>Đặt lại</Button>
                        <Button type="primary" icon={<SearchOutlined />} className="bg-blue-600" htmlType="submit">
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
            </Form>
            <Table
                columns={columns}
                dataSource={Array.isArray(data?.data?.data) ? data?.data?.data : []}
                loading={isLoading}
                scroll={{ y: 240 }}
                pagination={{
                    current: data?.data?.currentPage ? data.data.currentPage + 1 : 1,
                    total: data?.data?.totalItems,
                    pageSize: 10,
                    onChange: handlePaginationChange,
                }}
            />
        </div>
    )
}

export default AccountManage