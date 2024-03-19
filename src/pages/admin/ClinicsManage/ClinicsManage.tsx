import { Link } from "react-router-dom"
import { Button, Table, Space, Dropdown, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { ExclamationCircleFilled, MoreOutlined } from "@ant-design/icons";
import { Notifn } from "../../../components/Notification";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { useDeleteClinicsMutation, useGetAllClinicsQuery } from "../../../api/site/Clinics";
import { IClinics } from "../../../interface/Clinics";

const { confirm } = Modal;
const ClinicsManage = () => {
    const { data, isLoading } = useGetAllClinicsQuery();
    const [deleteClinics] = useDeleteClinicsMutation();

    const showDeleteConfirm = (id: string | undefined) => {
        if (id !== undefined) {
            confirm({
                title: 'Xác nhận xoá',
                icon: <ExclamationCircleFilled />,
                content: 'Bạn có muốn xoá phòng khám này không??',
                okText: 'Có',
                cancelText: 'Không',
                okType: 'danger',
                async onOk() {
                    try {
                        await deleteClinics(id);
                        Notifn("success", "Thành công", "Đã xoá phòng khám thành công");
                    } catch (error) {
                        Notifn("error", "Lỗi", "Lỗi xoá");
                    }
                },
            });
        }
    };

    const columns: ColumnsType<IClinics> = [
        {
            title: 'STT',
            key: 'index',
            width: 100,
            render: (_text, _record, index) => index + 1,
        },
        {
            title: 'Tên phòng khám',
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
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address'
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
                            <a href={`sua-phong-kham/${record.id}`}>
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
                <h2 className="text-2xl font-semibold">Quản lý phòng khám</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to="/admin/them-phong-kham">Tạo phòng khám</Link>
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={data?.data}
                loading={isLoading}
                scroll={{ y: 400 }}
                className="h-[90%]" />
        </div>
    )
}

export default ClinicsManage