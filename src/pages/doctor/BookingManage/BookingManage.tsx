import { Link, useNavigate } from "react-router-dom"
import { Button, Table, Space, Modal, Form, DatePicker, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineEdit } from "react-icons/ai";
import { ExclamationCircleFilled, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Notifn } from "../../../components/Notification";
import { Key, useEffect, useState } from "react";
import { useDeleteBookingMutation, useSearchBookingMutation } from "../../../api/admin/Booking";
import dayjs from 'dayjs';
import { MdAddCard, MdDeleteOutline } from "react-icons/md";

const { confirm } = Modal;
const { RangePicker } = DatePicker;

const BookingManage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [idTime, setIdTime] = useState<Key[]>([]);

    const [searchBooking, { data, isLoading }] = useSearchBookingMutation();
    const [deleteBooking] = useDeleteBookingMutation();

    useEffect(() => {
        searchBooking({ fromDate: "", toDate: "", page: 0, resultLimit: 10 });
    }, [searchBooking]);

    const showDeleteConfirm = (id: string[] | Key[]) => {
        if (id !== undefined) {
            confirm({
                title: 'Xác nhận xoá',
                icon: <ExclamationCircleFilled />,
                content: "Bạn có muốn xoá lịch khám này không ??",
                okText: 'Có',
                cancelText: 'Không',
                okType: 'danger',
                async onOk() {
                    try {
                        deleteBooking({ idsToDelete: id })
                        Notifn("success", "Thành công", "Xoá lịch khám thành công thành công!");
                        searchBooking({ fromDate: "", toDate: "", page: 0, resultLimit: 10 });
                    } catch (error) {
                        Notifn("error", "Lỗi", "Lỗi xoá");
                    }
                },
            });
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSearch = (values: any) => {
        const fromDate = dayjs(values.name[0]).format('YYYY-MM-DD');
        const toDate = dayjs(values.name[1]).format('YYYY-MM-DD');
        searchBooking({
            fromDate: fromDate,
            toDate: toDate,
            page: 0,
            resultLimit: 10
        });
    };

    const handleReset = () => {
        form.resetFields();
        searchBooking({ fromDate: "", toDate: "", page: 0, resultLimit: 10 });
    };

    const handlePaginationChange = (currentPage: number, pageSize?: number) => {
        searchBooking({
            fromDate: form.getFieldValue('name'),
            toDate: form.getFieldValue('status'),
            page: currentPage - 1, // Trừ 1 vì API thường sử dụng index bắt đầu từ 0
            resultLimit: pageSize || 10, // Số lượng mục trên mỗi trang
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            key: 'index',
            width: 100,
            render: (_text, _record, index) => index + 1,
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',

        },
        {
            title: 'Số lịch khám',
            dataIndex: 'schedulesCount',
            key: 'schedulesCount',
            render: (_text, record) => {
                if (record.schedules && Array.isArray(record.schedules)) {
                    return record.schedules.length;
                } else {
                    return 0;
                }
            },

        },
        {
            title: 'Action',
            key: 'action',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (_text: any, _record: any) => (
                <Space size="middle">
                    <MdAddCard className="text-2xl text-blue-500 hover:text-blue-400 cursor-pointer" onClick={() => navigate(`/doctor/them-lich-kham`, { state: _record.date })} />
                </Space>
            ),
        },

    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expandedRowRender = (record: any) => {
        const columns = [
            { title: 'Thời gian bắt đầu', dataIndex: 'startTime', key: 'startTime' },
            { title: 'Thời gian kết thúc', dataIndex: 'endTime', key: 'endTime' },
            {
                title: 'Trạng thái',
                dataIndex: 'statusValue',
                key: 'statusValue',
                render: (statusValue: string) => {
                    let color = '';

                    if (statusValue === 'EXPIRED') {
                        color = 'red';
                    } else if (statusValue === 'FULL_SLOT') {
                        color = 'orange';
                    } else if (statusValue === 'ACTIVE') {
                        color = 'green';
                    }

                    return (
                        <Tag color={color}>{statusValue}</Tag>
                    );
                },
            },
            { title: 'Lượng người tối đa', dataIndex: 'maxNumber', key: 'maxNumber' },
            { title: 'Thời gian hết hạn đặt', dataIndex: 'bookingExpiredTime', key: 'bookingExpiredTime' },
            { title: 'Quyền sửa xoá', dataIndex: 'isEditable', key: 'isEditable', render: (value: number) => (value === 1 ? 'Có' : 'Không') },
            {
                title: 'Action',
                key: 'action',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                render: (_text: any, _record: any) => (
                    <Space size="middle" className="text-xl">
                        {_record.isEditable === 1 ? (
                            <Link to={`/doctor/sua-lich-kham/${_record.id}`}>
                                <AiOutlineEdit className="text-yellow-400 hover:text-yellow-300" />
                            </Link>
                        ) : (
                            <AiOutlineEdit className="text-yellow-400 cursor-not-allowed opacity-50" />
                        )}
                        {_record.isEditable === 1 ? (
                            <MdDeleteOutline
                                className="cursor-pointer text-red-500 hover:text-red-400"
                                onClick={() => showDeleteConfirm([_record.id])}
                            />
                        ) : (
                            <MdDeleteOutline
                                className="text-red-500 cursor-not-allowed opacity-50"
                            />
                        )}
                    </Space>
                ),
            },
        ];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const schedulesData = record.schedules.map((item: any) => ({
            ...item,
            key: item.id,
        }));
        return <Table
            columns={columns}
            dataSource={schedulesData}
            pagination={false}
            rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys) => {
                    setIdTime(selectedRowKeys)
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                getCheckboxProps: (record: any) => ({
                    disabled: record.isEditable === 0, // Column configuration not to be checked
                    name: record.isEditable,
                }),
            }}
        />;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newData = data?.data.map((item: any, index: any) => ({
        ...item,
        key: index.toString(),
    }));

    return (
        <div className="">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý lịch khám</h2>
                <Button type="primary" className="bg-blue-600">
                    <Link to="/doctor/them-lich-kham">Tạo lịch khám</Link>
                </Button>
            </div>
            <Form onFinish={handleSearch} form={form}>
                <div>
                    <div className="mb-4 grid grid-cols-3 gap-10 mx-8">
                        <div>
                            <p className="font-medium text-[17px] my-1.5 text-gray-700">Khoảng thời gian:</p>
                            <Form.Item name="name">
                                <RangePicker className="w-full h-10" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="mb-4 float-right mr-8 flex items-center gap-3">
                        <Button icon={<ReloadOutlined />} onClick={handleReset}>Đặt lại</Button>
                        <Button type="primary" icon={<SearchOutlined />} className="bg-blue-600" htmlType="submit">
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
            </Form>
            <Button className='my-6' type='primary' danger onClick={() => showDeleteConfirm(idTime)} disabled={idTime.length === 0}>Xoá</Button>
            <Table
                columns={columns}
                dataSource={newData}
                loading={isLoading}
                scroll={{ y: 400 }}
                pagination={{
                    current: data?.data?.currentPage ? data.data.currentPage + 1 : 1,
                    total: data?.data?.totalItems,
                    pageSize: 10,
                    onChange: handlePaginationChange,
                }}
                expandable={{ expandedRowRender }}
            />
        </div>
    )
}

export default BookingManage