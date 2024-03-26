import { useTranslation } from 'react-i18next';
import SlickCarousel from "../../components/SlickCarousel"
import { useNavigate } from 'react-router-dom';
import { LstCategories } from '../../interface/ListCategories';
import { convertToSlug } from '../../utils/convertToSlug';
import { useGetAllSpecialtyQuery } from '../../api/admin/Specialty';
import { useGetAllClinicsQuery } from '../../api/site/Clinics';
import { useSearchDoctorsMutation } from '../../api/admin/Doctor';
import { useEffect } from 'react';
import { Spin } from 'antd';

const Home = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const handleClick2 = (slug: string, data: LstCategories) => {
        navigate(`danh-sach/${convertToSlug(t(slug))}`, { state: { data, slug } });
    };
    const { data: specialty, isLoading: loadingSpecialty } = useGetAllSpecialtyQuery({ name: '', status: "1", page: 0, resultLimit: 10 });
    const { data: clinics, isLoading: loadingClinics } = useGetAllClinicsQuery({ search: '', province: '', status: '1', page: 0, resultLimit: 10 });
    const [search, { data: doctor, isLoading: loadingDoctor }] = useSearchDoctorsMutation();

    useEffect(() => {
        search({ name: "", clinic: "", speciality: "", page: 0, resultLimit: 10 })
    }, [search])


    const data = [
        { url: "https://cdn.bookingcare.vn/fo/w128/2023/06/07/161905-iconkham-chuyen-khoa.png", title: "Khám chuyên khoa" },
        { url: "https://cdn.bookingcare.vn/fo/w128/2023/06/07/161817-iconkham-tu-xa.png", title: "Khám từ xa" },
        { url: "https://cdn.bookingcare.vn/fo/w128/2023/06/07/161350-iconkham-tong-quan.png", title: "Khám tổng quan" },
        { url: "https://cdn.bookingcare.vn/fo/2023/06/07/161340-iconxet-nghiem-y-hoc.png", title: "Xét nghiệm y học" },
        { url: "https://cdn.bookingcare.vn/fo/w128/2023/06/07/161403-iconsuc-khoe-tinh-than.png", title: "Sức khoẻ tinh thần" },
        { url: "https://cdn.bookingcare.vn/fo/w128/2023/06/07/161410-iconkham-nha-khoa.png", title: "Khám nha khoa" },
        { url: "https://cdn.bookingcare.vn/fo/w128/2023/06/07/161421-icongoi-phau-thuat.png", title: "Gói phẫu thuật" },
        { url: "https://cdn.bookingcare.vn/fo/2023/09/20/145257-thiet-ke-chua-co-ten-3.png", title: "Sống khoẻ tiểu đường" },
        { url: "https://cdn.bookingcare.vn/fo/2023/06/07/161442-iconbai-test-suc-khoe2.png", title: "Bài Test sức khoẻ" },
        { url: "https://cdn.bookingcare.vn/fo/2023/07/06/163421-153524-near-home-01.png", title: "Y tế gần bạn" },
    ]

    const newSpecialty = specialty?.data?.data?.map((item: LstCategories) => ({ ...item, cateCode: "specialty" })) || [];


    const newClinics = clinics ? clinics?.data?.data?.map((item: LstCategories) => ({ ...item, cateCode: "clinics", })) : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    const newDoctor = doctor ? doctor?.data?.data?.map((item: LstCategories) => ({ ...item, cateCode: "doctor", name: item.doctorName, descriptionHtml: item.specialityName })) : [];


    return (
        <div>
            <div className='bg-[#EDFFFA] h-80 pt-3'>
                <img src="https://cdn.bookingcare.vn/fo/2023/11/02/134537-group-12314.png" className="max-w-screen-xl mx-auto w-[1200px] h-[400px] object-cover rounded-[30px]" alt="" />
            </div>

            <div className='max-w-screen-xl mx-44 mt-32'>
                <h2 className='my-8 font-semibold text-gray-800 text-2xl'>Dịch vụ toàn diện</h2>
                <div className='grid grid-cols-2 gap-10'>
                    {data.map((item, index) => (
                        <div key={index} className="bg-[url('https://bookingcare.vn/_next/static/media/ic_background_grid_item.b108f491.png')] flex gap-8 border-2 border-gray-200 rounded-3xl items-center py-5 px-8">
                            <img src={item.url} alt={item.title} className="w-16 h-16 object-cover" />
                            <span className='font-semibold text-xl text-gray-700'>{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-screen-xl mx-44 mt-20">
                <div className="flex justify-between items-center font-semibold text-2xl my-8">
                    <h2>{t('specialty')}</h2>

                    <div className="bg-[#DAF3F6] text-[#34929E] p-2 rounded-xl">
                        <button onClick={() => handleClick2('specialty', newSpecialty)}>{t('more')}</button>
                    </div>
                </div>
                <Spin spinning={loadingSpecialty}>
                    <SlickCarousel slides={newSpecialty} />
                </Spin>
            </div>

            <div className="max-w-screen-xl mx-44 mt-20">
                <div className="flex justify-between items-center font-semibold text-2xl my-8">
                    <h2>{t('clinics')}</h2>
                    <div className="bg-[#DAF3F6] text-[#34929E] p-2 rounded-xl">
                        <button onClick={() => handleClick2('clinics', newClinics)} >{t('more')} </button>
                    </div>
                </div>
                <Spin spinning={loadingClinics}>
                    <SlickCarousel slides={newClinics} />
                </Spin>
            </div>

            <div className="max-w-screen-xl mx-44 mt-20">
                <div className="flex justify-between items-center font-semibold text-2xl my-8">
                    <h2>{t('doctor')}</h2>
                    <div className="bg-[#DAF3F6] text-[#34929E] p-2 rounded-xl">
                        <button onClick={() => handleClick2('doctor', doctor)} >{t('more')} </button>
                    </div>
                </div>
                <Spin spinning={loadingDoctor}>
                    <SlickCarousel slides={newDoctor} />
                </Spin>
            </div>
        </div>

    )
}

export default Home