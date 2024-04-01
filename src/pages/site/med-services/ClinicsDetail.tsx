import { useTranslation } from "react-i18next";
import { AiFillHome } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useGetByIdClinicsQuery } from "../../../api/site/Clinics";
import { Link } from "react-router-dom";
import { Pagination, Select, Spin } from "antd";
import { useSearchDoctorsMutation } from "../../../api/admin/Doctor";
import { useEffect, useRef, useState } from "react";
import { IBooking, IBookingChildren } from "../../../interface/Booking";
import { TbHandFinger } from "react-icons/tb";
import { MdDateRange, MdLocationOn } from "react-icons/md";

const ClinicsDetail = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const [showMoreDetails, setShowMoreDetails] = useState(Array(10).fill(false));
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [selectedDate, setSelectedDate] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [lstDoctor, setLstDoctor] = useState<any>([]); //lưu data danh sách bác sĩ
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ltsService, setLstService] = useState<any>([]); //lưu data danh sách dịch vụ
    const doctorsListRef = useRef<HTMLDivElement>(null);
    console.log(lstDoctor)

    const { data, isLoading } = useGetByIdClinicsQuery(location.state.id)

    const [searchDoctor, { isLoading: doctorLoading }] = useSearchDoctorsMutation();

    useEffect(() => {
        fieldLstDotors()
        fieldLstService()
    }, [searchDoctor, currentPage])

    const fieldLstDotors = async () => {
        const response = await searchDoctor({ type: 1, name: "", clinic: location.state.id, speciality: "", page: currentPage - 1, resultLimit: 10 })
        if ('data' in response) { // Kiểm tra xem response có thuộc tính 'data' không
            setLstDoctor(response.data); // Nếu có, gán dữ liệu vào state lstDoctor
        }
    }

    const fieldLstService = async () => {
        const response = await searchDoctor({ type: 2, name: "", clinic: location.state.id, speciality: "", page: currentPage2 - 1, resultLimit: 10 })

        if ('data' in response) {
            setLstService(response.data)
        }
    }
    const toggleShowMoreDetails = (index: number) => {
        const updatedShowMoreDetails = [...showMoreDetails];
        updatedShowMoreDetails[index] = !updatedShowMoreDetails[index];
        setShowMoreDetails(updatedShowMoreDetails);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageChange2 = (page: number) => {
        setCurrentPage2(page);
    };


    const handleDateChange = (value: number) => {
        setSelectedDate(value);
    };

    const handleBookAppointment = () => {
        if (doctorsListRef.current) {
            doctorsListRef.current.scrollIntoView({ behavior: "smooth" }); // Lăn xuống phần danh sách bác sĩ
        }
    };


    return (
        <div>
            <Spin spinning={isLoading}>
                <div className='max-w-screen-xl mx-auto p-12'>
                    <div className="flex items-center gap-1 my-4 text-[#45C3D2] ">
                        <a href="/" className="flex gap-1"><AiFillHome className="text-xl" />/</a>
                        <p>{t(location.state.slug)}</p>
                    </div>
                    <div className='flex items-center'>
                        <div className='w-32 h-32 '>
                            <img src={data?.data?.imageUrl} className='object-cover p-4 w-full h-full' alt="" />
                        </div>
                        <div className="text-[#28213F] leading-10">
                            <p className="text-2xl font-semibold">{data?.data?.name}</p>
                            <p className="text-lg">{data?.data?.address}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-lg">Thông tin cơ sở y tế:</p>
                        <div className="mx-8"
                            dangerouslySetInnerHTML={{
                                __html: data?.data?.descriptionHtml || ""
                            }}
                        ></div>
                    </div>
                </div >
            </Spin >

            {/* Danh sách bác sĩ */}
            <div className='bg-gray-100 mt-2 py-4'>
                <Spin spinning={doctorLoading}>
                    <div className='max-w-screen-xl mx-44 grid grid-cols-1 gap-4' ref={doctorsListRef}>
                        <h2 className='font-semibold text-gray-800 text-2xl'>Bác sĩ</h2>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {lstDoctor?.data?.data.map((item: any, index: number) => (
                            <div key={item.id} className='py-3 rounded-xl shadow-md grid grid-cols-2 bg-white items-start'>
                                <div className='border-r border-gray-200 flex items-center gap-4 px-4'>
                                    <div className='flex flex-col justify-center items-center mt-4 w-1/5'>
                                        <img src={item.imageUrl} alt="" className='w-20 h-20 rounded-full' />
                                    </div>
                                    <div className='w-4/5'>
                                        <h3 className='font-medium text-xl text-blue-400'>{item.doctorName}</h3>
                                        <p className='text-gray-500 my-2'>Trưởng phân môn khớp, Đại học Y Hà Nội
                                            Nguyên Bác sĩ điều trị khoa Cơ xương khớp, Bệnh viện Bạch Mai
                                            Hiện đang là Phó Chủ tịch Hội khớp học Hà Nội</p>
                                        <p className='flex gap-1 items-center text-gray-500'>
                                            <MdLocationOn />
                                            <span>{item.provinceName}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className='px-4'>
                                    <Select style={{ width: 150 }} value={selectedDate} onChange={handleDateChange}>
                                        {item?.schedules?.map((item: IBooking, index: number) => (
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
                                                {item?.schedules[selectedDate]?.schedules.map((schedule: IBookingChildren, index: number) => (
                                                    <a
                                                        key={index}
                                                        className={`bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium ${schedule.status === 2 ? 'pointer-events-none opacity-50' : ''}`}
                                                    >
                                                        {`${schedule.startTime}-${schedule.endTime}`}
                                                    </a>
                                                ))}

                                            </div>
                                        </>
                                    )}
                                    <p className='text-gray-700 text-sm pt-1.5 my-1 border-b border-gray-200 pb-2.5 flex items-center'>
                                        Chọn và đặt <TbHandFinger className='mx-0.5 text-black' /> (Phí đặt lịch 0đ)
                                    </p>
                                    <div className='leading-6 border-b border-gray-200 pb-2'>
                                        <p className='uppercase text-gray-500 font-medium'>Địa chỉ khám</p>
                                        <p className='font-semibold'>{item.clinicName}</p>
                                        <p>{item.wardName} - {item.districtName} - {item.provinceName}</p>
                                    </div>
                                    <p className='border-b border-gray-200 py-2'>
                                        <span className='uppercase text-gray-500 font-medium mr-1'>Giá khám:</span>
                                        <span dangerouslySetInnerHTML={{ __html: item.note || '' }}></span>
                                        <div className="p-2 bg-gray-100 border border-gray-300 text-sm my-1">
                                            <p className="text-gray-600">{item.paymentMethod}</p>
                                        </div>
                                    </p>
                                    <div>
                                        <p className='mr-1'>
                                            <span className='uppercase text-gray-500 font-medium'>Loại bảo hiểm áp dụng</span>
                                            <span className='text-blue-400 ml-1 cursor-pointer' onClick={() => toggleShowMoreDetails(index)}>
                                                {showMoreDetails[index] ? '' : 'Xem chi tiết'}
                                            </span>
                                        </p>
                                        {showMoreDetails[index] && (
                                            <div>
                                                <div className="bg-gray-100 border border-gray-300 text-sm my-2">
                                                    {item.warrantyPolicy.map((warranty: { name: string, value: string }) => (
                                                        <div className="border border-gray-300 p-2">
                                                            <h1 className="text-base">{warranty.name}</h1>
                                                            <p className="text-gray-600">{warranty.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p onClick={() => toggleShowMoreDetails(index)} className='text-blue-400 ml-1 cursor-pointer'>{showMoreDetails[index] ? 'Ẩn' : ''}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-center">
                            <Pagination
                                current={currentPage}
                                total={lstDoctor?.data?.data?.totalPages}
                                pageSize={10}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </Spin>

                <Spin spinning={doctorLoading}>
                    <div className='max-w-screen-xl mx-44 grid grid-cols-1 gap-4'>
                        <h2 className='font-semibold text-gray-800 text-2xl'>Dịch vụ</h2>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {ltsService?.data?.data.map((item: any, index: number) => (
                            <div key={item.id} className='py-3 rounded-xl shadow-md grid grid-cols-2 bg-white items-start'>
                                <div className='border-r border-gray-200 flex items-center gap-4 px-4'>
                                    <div className='flex flex-col justify-center items-center mt-4 w-1/5'>
                                        <img src={item.imageUrl} alt="" className='w-20 h-20 rounded-full' />
                                    </div>
                                    <div className='w-4/5'>
                                        <h3 className='font-medium text-xl text-blue-400'>{item.doctorName}</h3>
                                        <p className='text-gray-500 my-2'>Trưởng phân môn khớp, Đại học Y Hà Nội
                                            Nguyên Bác sĩ điều trị khoa Cơ xương khớp, Bệnh viện Bạch Mai
                                            Hiện đang là Phó Chủ tịch Hội khớp học Hà Nội</p>
                                        <p className='flex gap-1 items-center text-gray-500'>
                                            <MdLocationOn />
                                            <span>{item.provinceName}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className='px-4'>
                                    <Select style={{ width: 150 }} value={selectedDate} onChange={handleDateChange}>
                                        {item?.schedules?.map((item: IBooking, index: number) => (
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
                                                {item?.schedules[selectedDate]?.schedules.map((schedule: IBookingChildren, index: number) => (
                                                    <a
                                                        key={index}
                                                        className={`bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium ${schedule.status === 2 ? 'pointer-events-none opacity-50' : ''}`}
                                                    >
                                                        {`${schedule.startTime}-${schedule.endTime}`}
                                                    </a>
                                                ))}

                                            </div>
                                        </>
                                    )}
                                    <p className='text-gray-700 text-sm pt-1.5 my-1 border-b border-gray-200 pb-2.5 flex items-center'>
                                        Chọn và đặt <TbHandFinger className='mx-0.5 text-black' /> (Phí đặt lịch 0đ)
                                    </p>
                                    <div className='leading-6 border-b border-gray-200 pb-2'>
                                        <p className='uppercase text-gray-500 font-medium'>Địa chỉ khám</p>
                                        <p className='font-semibold'>{item.clinicName}</p>
                                        <p>{item.wardName} - {item.districtName} - {item.provinceName}</p>
                                    </div>
                                    <p className='border-b border-gray-200 py-2'>
                                        <span className='uppercase text-gray-500 font-medium mr-1'>Giá khám:</span>{item.note}
                                        <div className="p-2 bg-gray-100 border border-gray-300 text-sm my-1">
                                            <p className="text-gray-600">{item.paymentMethod}</p>
                                        </div>
                                    </p>
                                    <div>
                                        <p className='mr-1'>
                                            <span className='uppercase text-gray-500 font-medium'>Loại bảo hiểm áp dụng</span>
                                            <span className='text-blue-400 ml-1 cursor-pointer' onClick={() => toggleShowMoreDetails(index)}>
                                                {showMoreDetails[index] ? '' : 'Xem chi tiết'}
                                            </span>
                                        </p>
                                        {showMoreDetails[index] && (
                                            <div>
                                                <div className="bg-gray-100 border border-gray-300 text-sm my-2">
                                                    {item.warrantyPolicy.map((warranty: { name: string, value: string }) => (
                                                        <div className="border border-gray-300 p-2">
                                                            <h1 className="text-base">{warranty.name}</h1>
                                                            <p className="text-gray-600">{warranty.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p onClick={() => toggleShowMoreDetails(index)} className='text-blue-400 ml-1 cursor-pointer'>{showMoreDetails[index] ? 'Ẩn' : ''}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-center">
                            <Pagination
                                current={currentPage2}
                                total={ltsService?.data?.data?.totalPages || 0}
                                pageSize={10}
                                onChange={handlePageChange2}
                            />
                        </div>
                    </div>
                </Spin>
            </div>

            <div className="fixed bottom-0 w-full bg-white py-3 px-14">
                {data?.data?.hasChildren === 0 ? (
                    <button onClick={handleBookAppointment}
                        className="bg-yellow-400 text-white w-full justify-between py-2 rounded-md text-lg hover:brightness-105">
                        Đặt lịch khám
                    </button>
                ) : (
                    <Link
                        to={`${data?.data?.id}`}
                        className="block text-center bg-blue-400 text-white w-full justify-between py-2 rounded-md text-lg hover:brightness-105"
                    >
                        Chọn chuyên khoa
                    </Link>
                )}
            </div>
        </div>
    )
}

export default ClinicsDetail