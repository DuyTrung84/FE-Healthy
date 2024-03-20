import { useTranslation } from "react-i18next";
import { AiFillHome } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useGetByIdClinicsQuery } from "../../../api/site/Clinics";
import { Link } from "react-router-dom";

const ClinicsDetail = () => {
    const location = useLocation();
    const { t } = useTranslation();

    const { data } = useGetByIdClinicsQuery(location.state.id)

    const handleChooseSpecialty = () => {
        window.location.href = `/${data?.data?.id}`// Chuyển hướng đến đường dẫn phù hợp
    };
    return (
        <div>
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
            <div className="fixed bottom-0 w-full bg-white py-3 px-14">
                {data?.data?.hasChildren === 1 ? (
                    <button
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

        </div >
    )
}

export default ClinicsDetail