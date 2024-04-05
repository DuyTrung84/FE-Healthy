import { useTranslation } from "react-i18next";
import { AiFillCalendar, AiFillClockCircle, AiFillHome } from "react-icons/ai";
import { useGetHistoryBookingMutation } from "../../api/site/Clinics";
import { useEffect, useState } from "react";
import { Button, DatePicker, Form, Pagination, Spin } from "antd";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const AppointmentHist = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);

    const [search, { data, isLoading }] = useGetHistoryBookingMutation();

    useEffect(() => {
        search({ fromDate: "", toDate: "", status: "", page: currentPage - 1, resultLimit: 10 })
    }, [search, currentPage])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSearch = (values: any) => {
        const fromDate = dayjs(values.name[0]).format('YYYY-MM-DD');
        const toDate = dayjs(values.name[1]).format('YYYY-MM-DD');
        search({
            fromDate: fromDate,
            toDate: toDate,
            status: "",
            page: 0,
            resultLimit: 10
        });
    };

    const handleReset = () => {
        form.resetFields();
        search({ fromDate: "", toDate: "", status: "", page: 0, resultLimit: 10 });
    };

    return (
        <div className="max-w-screen-xl mx-44">
            <div className="flex items-center gap-1 my-4 text-[#45C3D2]">
                <a href="/" className="flex gap-1"><AiFillHome className="text-xl" />/</a>
                <p> {t('history')}</p>
            </div>
            <h2 className="font-bold text-xl mt-2 mb-5">{t('history')}</h2>
            <Form onFinish={handleSearch} form={form} className="ml-8 my-4">
                <p className="font-medium text-[17px] my-1.5 text-gray-700 mb-2">Khoảng thời gian:</p>
                <div className="flex gap-4">
                    <Form.Item name="name">
                        <RangePicker />
                    </Form.Item>
                    <Button icon={<ReloadOutlined />} onClick={handleReset}>Đặt lại</Button>
                    <Button type="primary" icon={<SearchOutlined />} className="bg-blue-600" htmlType="submit">
                        Tìm kiếm
                    </Button>

                </div>
            </Form>
            <Spin spinning={isLoading}>
                <div className="grid grid-cols-1 gap-8 mx-24">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {data?.data?.data.map((item: any) => (
                        <div className="grid grid-cols-4 items-center py-6 px-20 gap-4 border-2 rounded-xl shadow-lg">
                            <div className="col-span-1 flex flex-col gap-2 justify-center items-center ">
                                <div className="border-2 border-gray-200 p-2 rounded-full w-24 h-24 flex justify-center items-center">
                                    <img src={item.patientProfile.imgUrl} alt="" className="w-20 h-20 object-cover rounded-full" />
                                </div>
                                <p className="font-semibold text-[#49BCE2] uppercase text-lg">Khám</p>
                                <p className="flex gap-2 items-center text-[#FFC10E]">
                                    <AiFillClockCircle className="text-3xl" />
                                    <span className="text-lg font-medium">{item.timeStart}-{item.timeEnd}</span>
                                </p>
                                <p className="flex gap-2 items-center text-[#FFC10E]">
                                    <AiFillCalendar className="text-3xl" />
                                    <span className="text-lg font-medium">{item.date}</span>
                                </p>
                            </div>
                            <div className="col-span-3 text-start grid grid-cols-1 gap-2 text-lg">
                                <p className="font-semibold">Bệnh nhân: {item.patientProfile.fullName}</p>
                                <p>Bác sĩ : <span className="text-[#45C3D2]">{item.doctorName}</span></p>
                                <p>Nơi khám: {item.clinicName}</p>
                                <p className="line-clamp-4">Lý do khám: {item.reasonBooking} </p>
                                <button className="text-center text-white bg-[#FFC20E] px-6 py-3 mt-2 w-2/5 rounded-lg font-semibold">
                                    <p>Đã đặt lịch khám</p>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Spin>
            <Pagination
                current={currentPage}
                total={data?.data?.totalPages * 10}
                pageSize={10}
                onChange={(page) => setCurrentPage(page)}
                className="text-center mt-8"
            />
        </div>
    )
}

export default AppointmentHist