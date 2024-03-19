import { Link } from "react-router-dom"
import { Button, Table, Space, Dropdown, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { ExclamationCircleFilled, MoreOutlined } from "@ant-design/icons";
import { useDeleteSpecialtyMutation, useGetAllSpecialtyQuery } from "../../../api/admin/Specialty";
import { Notifn } from "../../../components/Notification";
import { ISpecialty } from "../../../interface/Specialty";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

const { confirm } = Modal;
const SpecialtyManage = () => {

    const { data, isLoading } = useGetAllSpecialtyQuery();
    const [deleteSpecialty] = useDeleteSpecialtyMutation();


    const showDeleteConfirm = (id: string | undefined) => {
        if (id !== undefined) {
            confirm({
                title: 'Xác nhận xoá',
                icon: <ExclamationCircleFilled />,
                content: 'Bạn có muốn xoá chuyên khoa này không??',
                okText: 'Có',
                cancelText: 'Không',
                okType: 'danger',
                async onOk() {
                    try {
                        await deleteSpecialty(id);
                        Notifn("success", "Thành công", "Đã xoá chuyên khoa thành công");
                    } catch (error) {
                        Notifn("error", "Lỗi", "Lỗi xoá");
                    }
                },
            });
        }
    };

    const columns: ColumnsType<ISpecialty> = [
        {
            title: 'STT',
            key: 'index',
            width: 100,
            render: (_text, _record, index) => index + 1,
        },
        {
            title: 'Tên chuyên khoa',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Ảnh',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl: string) => (
                <img src={imageUrl} alt="Ảnh" style={{ maxWidth: '100px', maxHeight: '100px' }} />
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
                        key: 'edit',
                        label: (
                            <a href={`sua-chuyen-khoa/${record.id}`}>
                                <p className=""><AiOutlineEdit className="inline-block mr-2 text-xl " />Sửa</p>
                            </a>
                        ),
                    },
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
                <h2 className="text-2xl font-semibold">Quản lý chuyên khoa</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to="/admin/them-chuyen-khoa">Tạo chuyên khoa</Link>
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={Array.isArray(data?.data) ? data?.data : []}
                loading={isLoading}
                scroll={{ y: 400 }} />
        </div>
    )
}

export default SpecialtyManage