import { useTranslation } from 'react-i18next';
import SlickCarousel from "../../components/SlickCarousel"
import { useNavigate } from 'react-router-dom';
import { LstCategories } from '../../interface/ListCategories';
import { convertToSlug } from '../../utils/convertToSlug';
import { useGetAllSpecialtyQuery } from '../../api/admin/Specialty';
import { useGetAllClinicsQuery } from '../../api/site/Clinics';

const Home = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const handleClick2 = (slug: string, data: LstCategories) => {
        navigate(`danh-sach/${convertToSlug(t(slug))}`, { state: { data, slug } });
    };
    const { data: specialty } = useGetAllSpecialtyQuery(undefined);
    const { data: clinics } = useGetAllClinicsQuery();


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
    const doctor: any = [
        { imageUrl: "https://cdn.bookingcare.vn/fo/w128/2022/07/18/160559-161139-bs-huyen.png", name: "Bác sĩ 1", desc: "Bác sĩ 1 ahihii" },
        { imageUrl: "https://cdn.bookingcare.vn/fo/w128/2021/05/20/141836-bs-le-quoc-viet.png", name: "Bác sĩ 2", desc: "Bác sĩ 2 ahihii" },
        { imageUrl: "https://cdn.bookingcare.vn/fo/w128/2017/12/23/162751bac-si-nguyen-xuan-thanh.jpg", name: "Bác sĩ 3", desc: "Bác sĩ 3 ahihii" },
        { imageUrl: "https://cdn.bookingcare.vn/fo/w128/2017/12/22/155419nguyen-thi-kim-loan.jpg", name: "Bác sĩ 4", desc: "Bác sĩ 4 ahihii" },
    ]


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
                <SlickCarousel slides={newSpecialty} />
            </div>

            <div className="max-w-screen-xl mx-44 mt-20">
                <div className="flex justify-between items-center font-semibold text-2xl my-8">
                    <h2>{t('clinics')}</h2>
                    <div className="bg-[#DAF3F6] text-[#34929E] p-2 rounded-xl">
                        <button onClick={() => handleClick2('clinics', newClinics)} >{t('more')} </button>
                    </div>
                </div>
                <SlickCarousel slides={newClinics} />
            </div>

            <div className="max-w-screen-xl mx-44 mt-20">
                <div className="flex justify-between items-center font-semibold text-2xl my-8">
                    <h2>{t('doctor')}</h2>
                    <div className="bg-[#DAF3F6] text-[#34929E] p-2 rounded-xl">
                        <button onClick={() => handleClick2('doctor', doctor)} >{t('more')} </button>
                    </div>
                </div>
                <SlickCarousel slides={doctor} />
            </div>
        </div>

    )
}

export default Home