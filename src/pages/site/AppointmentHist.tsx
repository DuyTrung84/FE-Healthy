import { useTranslation } from "react-i18next";
import { AiFillCalendar, AiFillClockCircle, AiFillHome } from "react-icons/ai";

const AppointmentHist = () => {
    const { t } = useTranslation();
    return (
        <div className="max-w-screen-xl mx-44">
            <div className="flex items-center gap-1 my-4 text-[#45C3D2]">
                <a href="/" className="flex gap-1"><AiFillHome className="text-xl" />/</a>
                <p>{t('history')}</p>
            </div>
            <h2 className="font-bold text-xl mt-2 mb-5">{t('history')}</h2>
            <div className="grid grid-cols-1 gap-8 mx-24">
                <div className="flex items-center py-6 px-24 gap-8 border-2 rounded-xl shadow-lg">
                    <div className="flex flex-col gap-2 justify-center items-center ">
                        <div className="border-2 border-gray-200 p-2 rounded-full w-24 h-24 flex justify-center items-center">
                            <img src="https://bookingcare.vn/_next/static/media/ic_kham.b8b58dd8.png" alt="" className="w-[50px] h-16 object-cover" />
                        </div>
                        <p className="font-semibold text-[#49BCE2] uppercase text-lg">Khám</p>
                        <p className="flex gap-2 items-center text-[#FFC10E]">
                            <AiFillClockCircle className="text-3xl" />
                            <span className="text-lg font-medium">10:00-10:30</span>
                        </p>
                        <p className="flex gap-2 items-center text-[#FFC10E]">
                            <AiFillCalendar className="text-3xl" />
                            <span className="text-lg font-medium">01/03/2024</span>
                        </p>
                    </div>
                    <div className="text-start grid grid-cols-1 gap-2 text-lg">
                        <p className="font-semibold">Bệnh nhân: Nguyễn Duy Tú</p>
                        <p>Bác sĩ : <span className="text-[#45C3D2]">Gói khám sức khỏe tổng quát định kỳ nâng cao Nam (TC3M)</span></p>
                        <p>Nơi khám: Bênh viện Lão khoa Trung Ương</p>
                        <p>Lý do khám:</p>
                        <button className="text-center text-white bg-[#FFC20E] px-6 py-3 mt-2 w-2/5 rounded-lg font-semibold">
                            <p>Đã đặt lịch khám</p>
                        </button>
                    </div>
                </div>
                <div className="flex items-center py-6 px-24 gap-8 border-2 rounded-xl shadow-lg">
                    <div className="flex flex-col gap-2 justify-center items-center ">
                        <div className="border-2 border-gray-200 p-2 rounded-full w-24 h-24 flex justify-center items-center">
                            <img src="https://bookingcare.vn/_next/static/media/ic_goi_kham.0b32a410.png" alt="" className="w-[50px] h-16 object-cover" />
                        </div>
                        <p className="font-semibold text-[#49BCE2] uppercase text-lg">Khám</p>
                        <p className="flex gap-2 items-center text-[#FFC10E]">
                            <AiFillClockCircle className="text-3xl" />
                            <span className="text-lg font-medium">10:00-10:30</span>
                        </p>
                        <p className="flex gap-2 items-center text-[#FFC10E]">
                            <AiFillCalendar className="text-3xl" />
                            <span className="text-lg font-medium">01/03/2024</span>
                        </p>
                    </div>
                    <div className="text-start grid grid-cols-1 gap-2 text-lg">
                        <p className="font-semibold">Bệnh nhân: Nguyễn Duy Tú</p>
                        <p>Bác sĩ : <span className="text-[#45C3D2]">Gói khám sức khỏe tổng quát định kỳ nâng cao Nam (TC3M)</span></p>
                        <p>Nơi khám: Bênh viện Lão khoa Trung Ương</p>
                        <p>Lý do khám:</p>
                        <button className="text-center text-white bg-[#FFC20E] px-6 py-3 mt-2 w-2/5 rounded-lg font-semibold">
                            <p>Đã đặt lịch khám</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentHist