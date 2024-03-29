import { Link } from "react-router-dom"
import { Button, Table, Space, Dropdown, Modal, Input, Form, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { ExclamationCircleFilled, MoreOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Notifn } from "../../../components/Notification";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { IAccount } from "../../../interface/Account";
import { useEffect } from "react";
import { useSearchDoctorsMutation } from "../../../api/admin/Doctor";
import { useGetAllClinicsQuery } from "../../../api/site/Clinics";
import { useGetAllSpecialtyQuery } from "../../../api/admin/Specialty";

const { confirm } = Modal;
const ServiceManage = () => {
    const [form] = Form.useForm();
    const [searchService, { data, isLoading }] = useSearchDoctorsMutation();
    const { data: clinics, isLoading: loadingClinics } = useGetAllClinicsQuery({ search: "", province: "", status: "", page: 0, resultLimit: 10 });//Phòng khám
    const { data: specialty, isLoading: loadingSpecialty } = useGetAllSpecialtyQuery({ name: "", status: "", page: 0, resultLimit: 10 });//Chuyên khoa


    useEffect(() => {
        searchService({ type: 2, name: "", clinic: "", speciality: "", page: 0, resultLimit: 10 })
    }, [searchService]);

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
        searchService({
            type: 2,
            name: values.name,
            clinic: values.clinicsId,
            speciality: values.specialitiesId,
            page: 0,
            resultLimit: 10
        })
    };

    const handleReset = () => {
        form.resetFields();
        searchService({ type: 2, name: "", clinic: "", speciality: "", page: 0, resultLimit: 10 })
    };

    const handlePaginationChange = (currentPage: number, pageSize?: number) => {
        searchService({
            type: 2,
            name: form.getFieldValue('name'),
            clinic: form.getFieldValue('clinicsId'),
            speciality: form.getFieldValue('keywspecialitiesIdord'),
            page: currentPage - 1,
            resultLimit: pageSize || 10
        })
    };
    const columns: ColumnsType<IAccount> = [
        {
            title: 'STT',
            key: 'index',
            width: 60,
            render: (_text, _record, index) => index + 1,
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'doctorName',
            key: 'doctorName',

        },
        {
            title: 'Chuyên khoa',
            dataIndex: 'specialityName',
            key: 'specialityName',

        },
        {
            title: 'Chuyên khoa',
            dataIndex: 'clinicName',
            key: 'clinicName',
            width: 400

        },
        {
            title: 'Giá',
            dataIndex: 'note',
            key: 'note',

        },
        {
            title: 'Ảnh',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl: string) => (
                <img src={`${imageUrl}`} alt="Ảnh" style={{ maxWidth: '120px', maxHeight: '120px' }} />
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
                <h2 className="text-2xl font-semibold">Quản lý tài khoản</h2>
            </div>
            <Form onFinish={handleSearch} form={form}>
                <div>
                    <div className="mb-8 grid grid-cols-3 gap-10 mx-8">
                        <div>
                            <p className="font-medium text-[17px] my-1.5 text-gray-700">Tên dịch vụ:</p>
                            <Form.Item name="name">
                                <Input placeholder="Nhập tên dịch vụ" />
                            </Form.Item>
                        </div>
                        <div>
                            <p className="font-medium text-[17px] my-1.5 text-gray-700">Tên phòng khám:</p>
                            <Form.Item
                                name="clinicsId"
                            >
                                <Select placeholder="---Chọn phòng khám---" loading={loadingClinics}                                    >
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {clinics?.data?.data?.map((role: any) => (
                                        <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <div>
                            <p className="font-medium text-[17px] my-1.5 text-gray-700">Tên chuyên khoa:</p>
                            <Form.Item
                                name="specialitiesId"
                            >
                                <Select placeholder="---Chọn chuyên khoa---" loading={loadingSpecialty}                                    >
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {specialty?.data?.data?.map((role: any) => (
                                        <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
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

export default ServiceManage