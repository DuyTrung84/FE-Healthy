import { useTranslation } from "react-i18next";
import { AiFillHome } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useGetByIdClinicsQuery } from "../../../api/site/Clinics";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { useSearchDoctorsMutation } from "../../../api/admin/Doctor";
import { useEffect, useRef, useState } from "react";
import ListBooking from "../../../components/ListBooking";

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
                        <p className="font-semibold text-lg">{t('clinicsDetail.descClinics')}</p>
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
                <h2 className='font-semibold text-gray-800 text-2xl max-w-screen-xl mx-44 mb-4' ref={doctorsListRef}>{t('clinicsDetail.doctor')}</h2>
                <ListBooking
                    lstService={lstDoctor}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    handleDateChange={handleDateChange}
                    selectedDate={selectedDate}
                    toggleShowMoreDetails={toggleShowMoreDetails}
                    showMoreDetails={showMoreDetails}
                    doctorLoading={doctorLoading}
                />

                <h2 className='font-semibold text-gray-800 text-2xl max-w-screen-xl mx-44 mb-4'>{t('clinicsDetail.service')}</h2>
                <ListBooking
                    lstService={ltsService}
                    currentPage={currentPage2}
                    handlePageChange={handlePageChange2}
                    handleDateChange={handleDateChange}
                    selectedDate={selectedDate}
                    toggleShowMoreDetails={toggleShowMoreDetails}
                    showMoreDetails={showMoreDetails}
                    doctorLoading={doctorLoading}
                />
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