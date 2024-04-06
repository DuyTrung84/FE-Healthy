import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillHome, AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { useGetByIdSpecialtyQuery } from '../../../api/admin/Specialty';
import { useSearchDoctorsMutation } from '../../../api/admin/Doctor';
import ListBooking from '../../../components/ListBooking';

const MedExamination = () => {
    const [showMore, setShowMore] = useState(false);
    const [showMoreDetails, setShowMoreDetails] = useState(Array(10).fill(false));
    const location = useLocation();
    const { t } = useTranslation();
    const id = location.state.id
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);
    // const [selectedDate, setSelectedDate] = useState(0);
    const [selectedDates, setSelectedDates] = useState<number[]>(Array(10).fill(0));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [lstDoctor, setLstDoctor] = useState<any>([]); //lưu data danh sách bác sĩ
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ltsService, setLstService] = useState<any>([]); //lưu data danh sách dịch vụ

    const { data: getDetail } = useGetByIdSpecialtyQuery(id || "");
    const [searchDoctor, { isLoading: doctorLoading }] = useSearchDoctorsMutation();

    useEffect(() => {
        fieldLstDotors()
        fieldLstService()
    }, [searchDoctor, id, currentPage, currentPage2])

    const fieldLstDotors = async () => {
        const response = await searchDoctor({ type: 1, name: "", clinic: "", speciality: id, page: currentPage - 1, resultLimit: 5 })
        if ('data' in response) { // Kiểm tra xem response có thuộc tính 'data' không
            setLstDoctor(response.data); // Nếu có, gán dữ liệu vào state lstDoctor
        }
    }

    const fieldLstService = async () => {
        const response = await searchDoctor({ type: 2, name: "", clinic: "", speciality: id, page: currentPage2 - 1, resultLimit: 5 })
        if ('data' in response) {
            setLstService(response.data)
        }
    }

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const toggleShowMoreDetails = (index: number) => {
        const updatedShowMoreDetails = [...showMoreDetails];
        updatedShowMoreDetails[index] = !updatedShowMoreDetails[index];
        setShowMoreDetails(updatedShowMoreDetails);
    };

    const handlePageChange = (page: number) => {
        console.log(page)
        setCurrentPage(page);
    };

    const handlePageChange2 = (page: number) => {
        setCurrentPage2(page);
    };

    const handleDateChange = (value: number, index: number) => {
        const updatedSelectedDates = [...selectedDates];
        updatedSelectedDates[index] = value;
        setSelectedDates(updatedSelectedDates);
    };

    return (
        <div>
            <div className="max-w-screen-xl mx-44">
                <div className="flex items-center gap-1 my-4 text-[#45C3D2] ">
                    <a href="/" className="flex gap-1"><AiFillHome className="text-xl" />/</a>
                    <p>{t(location.state.slug)}</p>
                </div>
                <h1 className='text-xl font-medium'>{getDetail?.data?.name}</h1>
                <div className={`${showMore ? "max-h-full" : "max-h-32 overflow-hidden"} transition-max-h duration-500 ease-in-out ml-3`}>
                    <p dangerouslySetInnerHTML={{ __html: getDetail?.data?.descriptionHtml || '' }} />
                </div>
                <button
                    className="mt-2 flex text-[#288AD6] font-light"
                    onClick={toggleShowMore}
                >
                    {showMore
                        ? <span>{t('clinicsDetail.hidden')}< AiOutlineCaretUp className="inline-block" /></span>
                        : <span>{t('clinicsDetail.more')}< AiOutlineCaretDown className="inline-block" /></span>}
                </button>
            </div>
            <div className='bg-gray-100 mt-2 py-4'>

                <h2 className='font-semibold text-gray-800 text-2xl max-w-screen-xl mx-44 mb-4'>{t('clinicsDetail.doctor')}</h2>
                <ListBooking
                    lstService={lstDoctor}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    handleDateChange={handleDateChange}
                    selectedDates={selectedDates}
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
                    selectedDates={selectedDates}
                    toggleShowMoreDetails={toggleShowMoreDetails}
                    showMoreDetails={showMoreDetails}
                    doctorLoading={doctorLoading}
                />
            </div>
        </div>
    )
}

export default MedExamination