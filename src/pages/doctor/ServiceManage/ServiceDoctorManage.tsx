import { useParams } from "react-router-dom"
import { Button, Table, Space, Modal, Form, DatePicker, Tag, Input, Select, Upload } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ExclamationCircleFilled, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Notifn } from "../../../utils/Notification";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { useCloseBookingMutation, useSearchServiceDoctorMutation } from "../../../api/admin/Doctor";
import { useCancelAppointmentMutation } from "../../../api/site/Payment";
import { useGetStatusBookingQuery } from "../../../api/admin/Booking";
import { FaClipboardCheck, FaRegClosedCaptioning } from "react-icons/fa6";
import { UploadChangeParam } from "antd/es/upload";
import { useUploadMultipartMutation } from "../../../api/share/upload";

const { confirm } = Modal;
const { RangePicker } = DatePicker;

const ServiceBookingManage = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [fileList, setFileList] = useState<any>([]); // Định nghĩa state fileList
    console.log(fileList)

    const [searchBooking, { data, isLoading }] = useSearchServiceDoctorMutation();
    const [cancel, { isLoading: cancelLoading }] = useCancelAppointmentMutation();
    const { data: bookingStatus } = useGetStatusBookingQuery();
    const [close, { isLoading: closeLoading }] = useCloseBookingMutation();
    const [upload] = useUploadMultipartMutation()

    useEffect(() => {
        searchBooking({ idService: id || null, status: "", fromDate: "", toDate: "" });
        form.submit();
    }, [searchBooking, form, id]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const showCancelConfirm = (values: any) => {
        if (values !== undefined) {
            confirm({
                title: 'Xác nhận huỷ',
                icon: <ExclamationCircleFilled />,
                content: "Bạn có muốn huỷ lịch khám này không ??",
                okText: 'Có',
                cancelText: 'Không',
                okType: 'danger',
                async onOk() {
                    try {
                        await cancel({ ...values, idBooking: selectedAppointmentId })
                        Notifn("success", "Thành công", "Huỷ lịch khám thành công!");
                        hiddenModal();
                        searchBooking({ idService: id || null, status: "", fromDate: "", toDate: "" });
                        form.submit();
                        form2.resetFields();
                    } catch (error) {
                        console.log(error)
                        Notifn("error", "Lỗi", "Lỗi huỷ");
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
            idService: id || null,
            status: "",
            fromDate: fromDate,
            toDate: toDate,
        });
    };

    const handleReset = () => {
        form.resetFields();
        searchBooking({ idService: id || null, status: "", fromDate: "", toDate: "" });
    };

    const showModal = (idBooking: string) => {
        setSelectedAppointmentId(idBooking)
        setIsModalOpen(true);
    };

    const hiddenModal = () => {
        setIsModalOpen(false);
    };

    const showModal2 = (idBooking: string) => {
        setSelectedAppointmentId(idBooking)
        setIsModalOpen2(true);
    };

    const hiddenModal2 = () => {
        setIsModalOpen2(false);
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
                if (record.bookingResponse && Array.isArray(record.bookingResponse)) {
                    return record.bookingResponse.length;
                } else {
                    return 0;
                }
            },

        },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const expandedRowRender = (record: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const columns: any = [
            { title: 'Thời gian bắt đầu', dataIndex: 'timeStart', key: 'timeStart', width: 100 },
            { title: 'Thời gian kết thúc', dataIndex: 'timeEnd', key: 'timeEnd', width: 100 },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status',
                render: (status: number) => {
                    let color = '';
                    let text = '';

                    if (status === 0) {
                        color = 'red';
                        text = 'Đã huỷ'
                    } else if (status === 2) {
                        color = 'blue';
                        text = 'Khám xong'
                    } else if (status === 1) {
                        color = 'green';
                        text = 'Đặt thành công'
                    }

                    return (
                        <Tag color={color}>{text}</Tag>
                    );
                },
            },// eslint-disable-next-line @typescript-eslint/no-explicit-any
            { title: 'Họ tên bệnh nhân', key: 'fullName', render: (_text: any, record: any) => (<p>{record.patientProfile.fullName}</p>) },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { title: 'SDT bệnh nhân', key: 'phoneNumber', render: (_text: any, record: any) => (<p>{record.patientProfile.phoneNumber}</p>) },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { title: 'Email bệnh nhân', key: 'email', render: (_text: any, record: any) => (<p>{record.patientProfile.email}</p>) },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { title: 'Năm sinh', key: 'birthdate', render: (_text: any, record: any) => (<p>{record.patientProfile.birthdate}</p>) },
            { title: 'Lý do khám', key: 'reasonBooking', dataIndex: 'reasonBooking', width: 200 },
            { title: 'Lý do huỷ', key: 'reasonCancel', dataIndex: 'reasonCancel' },
            {
                title: 'Action',
                key: 'action',
                fixed: 'right',
                width: 100,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                render: (_text: any, _record: any) => (
                    <Space size="middle" className="text-xl">
                        {_record.status === 1 ? (
                            <FaRegClosedCaptioning className="cursor-pointer text-red-500 hover:text-red-400" title="Huỷ lịch khám" onClick={() => showModal(_record.id)} />
                        ) : (
                            <FaRegClosedCaptioning className="text-red-500 cursor-not-allowed opacity-50" />
                        )}
                        {_record.status === 1 ? (
                            <FaClipboardCheck onClick={() => showModal2(_record.id)}
                                className="cursor-pointer text-green-500 hover:text-green-400"
                                title="Đã khám xong"
                            />
                        ) : (
                            <FaClipboardCheck className="text-green-500 cursor-not-allowed opacity-50" />
                        )}
                    </Space>
                ),
            },
        ];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const schedulesData = record.bookingResponse.map((item: any) => ({
            ...item,
            key: item.id,
        }));
        return <Table
            columns={columns}
            dataSource={schedulesData}
            pagination={false}
            scroll={{ x: 1400 }}
        />;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newData = data?.data.map((item: any, index: any) => ({
        ...item,
        key: index.toString(),
    }));

    const beforeUpload = () => {
        return true;
    };

    const handleChange = (info: UploadChangeParam) => {
        let newFileList = [...info.fileList];
        newFileList = newFileList.map(file => {
            if (!file.url && file.originFileObj) {
                file.url = URL.createObjectURL(file.originFileObj);
            }
            file.status = 'done';
            return file;
        });

        setFileList(newFileList);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const showCloseConfirm = (values: any) => {
        if (values !== undefined) {
            confirm({
                title: 'Xác nhận hoàn thành',
                icon: <ExclamationCircleFilled />,
                content: "Bạn có muốn hoàn thành lịch khám này không ??",
                okText: 'Có',
                cancelText: 'Không',
                okType: 'danger',
                async onOk() {
                    try {
                        const formData = new FormData();
                        if (fileList) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            fileList.forEach((file: any) => {
                                formData.append('files', file.originFileObj);
                            });
                        }
                        if (selectedAppointmentId) {
                            formData.append('id', selectedAppointmentId);
                        }
                        await upload(formData)
                            .unwrap()
                            .then(() => {
                                close({ ...values, idBooking: selectedAppointmentId })
                                    .unwrap()
                                    .then(() => {
                                        Notifn("success", "Thành công", "Hoàn thành lịch khám thành công!");
                                        hiddenModal2();
                                        searchBooking({ idService: id || null, status: "", fromDate: "", toDate: "" });
                                        form.submit();
                                        form3.resetFields();
                                        setFileList([])
                                    })
                                    .catch((error) => {
                                        Notifn("error", "Lỗi", error.message || error.data.message);
                                    })
                            })
                            .catch((error) => {
                                Notifn("error", "Lỗi", error.message || error.data.message);
                            })
                    } catch (error) {
                        console.log(error)
                        Notifn("error", "Lỗi", "Lỗi huỷ");
                    }
                },
            });
        }
    };

    return (
        <div className="">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý dịch vụ</h2>
            </div>
            <Form onFinish={handleSearch} form={form}>
                <div>
                    <div className="mb-4 grid grid-cols-3 gap-10 mx-8">
                        <div>
                            <p className="font-medium text-[17px] my-1.5 text-gray-700">Khoảng thời gian:</p>
                            <Form.Item name="name">
                                <RangePicker className="w-full h-8" />
                            </Form.Item>
                        </div>
                        <div>
                            <p className="font-medium text-[17px] my-1.5 text-gray-700">Trạng thái đặt lịch:</p>
                            <Form.Item name="status">
                                <Select placeholder="Trạng thái đặt lịch" className="h-8">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {bookingStatus?.data?.map((role: any) => (
                                        <Select.Option key={role.value} value={role.value}>{role.name}</Select.Option>
                                    ))}
                                </Select>
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
            <Table
                columns={columns}
                dataSource={newData}
                loading={isLoading}
                scroll={{ y: 400 }}
                expandable={{ expandedRowRender }}
            />


            <Modal width={500} open={isModalOpen} footer={null} onCancel={hiddenModal}>
                <Form
                    name="normal_login"
                    className="login-form"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={showCancelConfirm}
                    form={form2}
                >
                    <Form.Item
                        label="Lý do huỷ"
                        name="reasonCancel"
                        rules={[{ required: true, message: "Vui lòng nhập lý do huỷ!!" }]}
                    >
                        <Input placeholder="Nhập lý do huỷ" />
                    </Form.Item>

                    <Form.Item className='text-center'>
                        <Button type="primary" htmlType="submit" className="bg-blue-500 w-full" style={{ height: '45px' }} loading={cancelLoading}>
                            Huỷ đặt lịch
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>


            <Modal width={800} open={isModalOpen2} footer={null} onCancel={hiddenModal2} title="Biểu mẫu hoàn thành lịch khám">
                <Form
                    name="normal_login"
                    className="login-form"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={showCloseConfirm}
                    form={form3}
                >
                    <Form.Item
                        label="Ảnh"
                        name="imageObjectId"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                        ]}
                    >
                        <Upload
                            listType="picture-card" // Hiển thị giao diện là picture-card
                            fileList={fileList} // Sử dụng fileList để hiển thị danh sách các ảnh đã tải lên
                            showUploadList={{
                                showPreviewIcon: true,
                                showRemoveIcon: true,
                                showDownloadIcon: false,
                            }}
                            accept="image/*"
                            beforeUpload={beforeUpload} // Hàm xử lý trước khi tải lên
                            onChange={handleChange} // Hàm xử lý khi danh sách các tệp tải lên thay đổi
                        >
                            {fileList.length < 3 && '+ Upload'} {/* Hiển thị nút tải lên nếu chưa đạt số lượng tối đa */}
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="Lời nhắn"
                        name="msg"
                        rules={[{ required: true, message: "Vui lòng nhập lời nhắn!!" }]}
                    >
                        <Input.TextArea placeholder="Nhập lời nhắn" />
                    </Form.Item>

                    <Form.Item className='text-center'>
                        <Button type="primary" htmlType="submit" className="bg-blue-500 w-full" style={{ height: '45px' }} loading={closeLoading}>
                            Xác nhận khám xong
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default ServiceBookingManage