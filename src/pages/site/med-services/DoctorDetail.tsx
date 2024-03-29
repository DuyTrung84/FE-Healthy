import { useLocation } from "react-router-dom";
import { useGetByIdDoctorQuery } from "../../../api/admin/Doctor";
import { Select, Spin } from "antd";
import { AiFillHome, AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { MdDateRange, MdLocationPin } from "react-icons/md";
import { TbHandFinger } from "react-icons/tb";
import { useState } from "react";
import { useGetBookingQuery } from "../../../api/admin/Booking";
import { IBooking, IBookingChildren } from "../../../interface/Booking";
// import { useTranslation } from "react-i18next";


const DoctorDetail = () => {
    const [showMore, setShowMore] = useState(false);
    const [showMore2, setShowMore2] = useState(false);
    const [selectedDate, setSelectedDate] = useState(0);
    const location = useLocation();
    // const { t } = useTranslation();

    const { data: doctorData, isLoading: doctorLoading } = useGetByIdDoctorQuery(location.state.id)
    const { data: bookingData, isLoading: bookingLoading } = useGetBookingQuery(location.state.id || "")
    console.log(doctorData)

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const toggleShowMore2 = () => {
        setShowMore2(!showMore2);
    };

    const handleDateChange = (value: number) => {
        setSelectedDate(value);
    };

    return (
        <Spin spinning={doctorLoading}>
            <div className="max-w-screen-xl mx-auto px-12 py-4">
                <div className="flex items-center gap-1 my-4 text-[#45C3D2] ">
                    <a href="/" className="flex gap-1"><AiFillHome className="text-xl" />/</a>
                    <p>Bác sĩ /{doctorData?.data?.specialityName}</p>
                </div>
                <div className="flex gap-8 w-4/6 text-[#555555] leading-6">
                    <img src={doctorData?.data?.imageUrl} alt="" className="w-32 h-32 rounded-full" />
                    <div>
                        <h2 className="text-[27px] font-medium text-gray-800">{doctorData?.data?.doctorName}</h2>
                        <div className={`${showMore2 ? "max-h-full" : "max-h-32 overflow-hidden"} transition-max-h duration-500 ease-in-out ml-3`}>
                            <p className=" my-2" dangerouslySetInnerHTML={{ __html: doctorData?.data?.descriptionHtml || '' }}></p>
                        </div>
                        <button
                            className="mt-2 flex text-[#288AD6] font-light"
                            onClick={toggleShowMore2}
                        >
                            {showMore2
                                ? <span>Ẩn đi< AiOutlineCaretUp className="inline-block" /></span>
                                : <span>Xem thêm< AiOutlineCaretDown className="inline-block" /></span>}
                        </button>
                        <p className="flex gap-1 items-center text-lg">
                            <MdLocationPin /> {doctorData?.data?.provinceName}</p>
                    </div>
                </div>
                <div className='py-3 my-3 grid grid-cols-2 gap-16 bg-white items-start'>
                    <Spin spinning={bookingLoading}>
                        <div className='px-4'>
                            <Select style={{ width: 150 }} value={selectedDate} onChange={handleDateChange}>
                                {bookingData?.data.map((item: IBooking, index: number) => (
                                    <Select.Option key={index} value={index}>{item.date}</Select.Option>
                                ))}
                            </Select>
                            {selectedDate !== null && (
                                <>
                                    <h3 className='flex gap-1 items-center uppercase my-2'>
                                        <MdDateRange />
                                        Lịch khám
                                    </h3>
                                    <div className='grid grid-cols-4 gap-3'>
                                        {bookingData?.data[selectedDate]?.schedules.map((schedule: IBookingChildren, index: number) => (
                                            <a key={index} className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>
                                                {`${schedule.startTime}-${schedule.endTime}`}
                                            </a>
                                        ))}
                                    </div>
                                </>
                            )}
                            <p className='text-gray-700 text-sm pt-1.5 my-1 pb-2.5 flex items-center'>
                                Chọn và đặt <TbHandFinger className='mx-0.5 text-black' /> (Phí đặt lịch 0đ)
                            </p>
                        </div>
                    </Spin>
                    <div className="border-l border-gray-200 pl-8 py-4">
                        <div className='leading-6 border-b border-gray-200 pb-2'>
                            <p className='uppercase text-gray-500 font-medium'>Địa chỉ khám</p>
                            <p className='font-semibold'>{doctorData?.data?.clinicName}</p>
                            <p> {doctorData?.data?.address} {doctorData?.data?.wardName} - {doctorData?.data?.districtName} - {doctorData?.data?.provinceName}</p>
                        </div>
                        <p className='border-b border-gray-200 py-2'>
                            <span className='uppercase text-gray-500 font-medium mr-1'>Giá khám:</span>300.000đ
                        </p>
                        <div>
                            <p className='mr-1'>
                                <span className='uppercase text-gray-500 font-medium'>Loại bảo hiểm áp dụng</span>
                                <span className='text-blue-400 ml-1 cursor-pointer' onClick={toggleShowMore}>
                                    {showMore ? '' : 'Xem chi tiết'}
                                </span>
                            </p>
                            {showMore && (
                                <div>
                                    <div className="bg-gray-100 border border-gray-300 text-sm my-2">
                                        <div className="border-b border-gray-300 p-2">
                                            <h1 className="text-base">Bảo hiểm Y tế nhà nước</h1>
                                            <p className="text-gray-600">{doctorData?.data?.note}</p>
                                        </div>
                                        <div className="p-2">
                                            <h1 className="text-base">Bảo hiểm bảo lãnh</h1>
                                            <p className="text-gray-600">Phòng khám hiện chưa có đơn vị bảo hiểm bảo lãnh và không có xuất hóa đơn tài chính (hóa đơn đỏ)</p>
                                        </div>
                                    </div>
                                    <p onClick={toggleShowMore} className='text-blue-400 ml-1 cursor-pointer'>{showMore ? 'Ẩn' : ''}</p>
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Spin >
    )
}

export default DoctorDetail