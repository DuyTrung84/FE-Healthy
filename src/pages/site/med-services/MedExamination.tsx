import { Select } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillHome, AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { MdDateRange, MdLocationOn } from 'react-icons/md';
import { TbHandFinger } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';
import { useGetProvincesQuery } from '../../../api/share/area';
import { Option } from 'antd/es/mentions';
import { IProvinces } from '../../../interface/Area';
import { useGetByIdSpecialtyQuery } from '../../../api/admin/Specialty';

const MedExamination = () => {
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const id = location.state.id

    const { data: getDetail } = useGetByIdSpecialtyQuery(id || "");
    const { data: provinces } = useGetProvincesQuery();

    const toggleShowMore = () => {
        setShowMore(!showMore);
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
                        ? <span>Ẩn đi< AiOutlineCaretUp className="inline-block" /></span>
                        : <span>Xem thêm< AiOutlineCaretDown className="inline-block" /></span>}
                </button>
            </div>
            <div className='bg-gray-100 mt-2 py-4'>
                <div className='max-w-screen-xl mx-44 grid grid-cols-1 gap-4'>
                    <Select
                        showSearch
                        defaultValue=""
                        style={{ width: 150 }}
                        placeholder="Chọn tỉnh/thành phố"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option && option.children && typeof option.children === 'string'
                                ? (option.children as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                                : false
                        }
                    >
                        <Option value="">Toàn Quốc</Option>
                        {provinces &&
                            provinces?.data?.map((province: IProvinces) => (
                                <Option key={province.code} value={province.code}>
                                    {i18n.language === "vi" ? province.name : province.nameEn}
                                </Option>
                            ))}
                    </Select>

                    <div className='py-3 rounded-xl shadow-md grid grid-cols-2 bg-white items-start'>
                        <div className='border-r border-gray-200 flex items-center gap-4 px-4'>
                            <div className='flex flex-col justify-center items-center mt-4 w-1/5'>
                                <img src="https://cdn.bookingcare.vn/fo/w256/2019/12/31/161632-pgs-nguyen-vinh-ngoc.jpg" alt="" className='w-20 h-20 rounded-full' />
                                <a className='text-blue-300'>Xem thêm</a>
                            </div>
                            <div className='w-4/5'>
                                <h3 className='font-medium text-xl text-blue-400'>Phó giáo sư tiến sĩ bác sĩ Nguyễn Vĩnh Ngọc</h3>
                                <p className='text-gray-500 my-2'>Trưởng phân môn khớp, Đại học Y Hà Nội
                                    Nguyên Bác sĩ điều trị khoa Cơ xương khớp, Bệnh viện Bạch Mai
                                    Hiện đang là Phó Chủ tịch Hội khớp học Hà Nội</p>
                                <p className='flex gap-1 items-center text-gray-500'>
                                    <MdLocationOn />
                                    <span>Hà Nội</span>
                                </p>
                            </div>
                        </div>
                        <div className='px-4'>
                            <Select style={{ width: 150 }} defaultValue="1">
                                <Select.Option value="1">Thứ 7-3/3</Select.Option>
                                <Select.Option value="2">Thứ 6-2/3</Select.Option>
                                <Select.Option value="3">Thứ 5-1/3</Select.Option>
                            </Select>
                            <h3 className='flex gap-1 items-center uppercase my-2'>
                                <MdDateRange />
                                Lịch khám
                            </h3>
                            <div className='grid grid-cols-5 gap-3'>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                            </div>
                            <p className='text-gray-700 text-sm pt-1.5 my-1 border-b border-gray-200 pb-2.5 flex items-center'>
                                Chọn và đặt <TbHandFinger className='mx-0.5 text-black' /> (Phí đặt lịch 0đ)
                            </p>
                            <div className='leading-6 border-b border-gray-200 pb-2'>
                                <p className='uppercase text-gray-500 font-medium'>Địa chỉ khám</p>
                                <p className='font-semibold'>Phòng khám Cơ xương khớp bảo Ngọc</p>
                                <p>Số 73 ngõ 109 Hoàng Ngân - Thanh Xuân - Hà Nội</p>
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
                                                <p className="text-gray-600">Phòng khám không áp dụng thanh toán bảo hiểm y tế</p>
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

                    <div className='py-3 rounded-xl shadow-md grid grid-cols-2 bg-white items-start'>
                        <div className='border-r border-gray-200 flex items-center gap-4 px-4'>
                            <div className='flex flex-col justify-center items-center mt-4 w-1/5'>
                                <img src="https://cdn.bookingcare.vn/fo/w256/2019/12/31/161632-pgs-nguyen-vinh-ngoc.jpg" alt="" className='w-20 h-20 rounded-full' />
                                <a className='text-blue-300'>Xem thêm</a>
                            </div>
                            <div className='w-4/5'>
                                <h3 className='font-medium text-xl text-blue-400'>Phó giáo sư tiến sĩ bác sĩ Nguyễn Vĩnh Ngọc</h3>
                                <p className='text-gray-500 my-2'>Trưởng phân môn khớp, Đại học Y Hà Nội
                                    Nguyên Bác sĩ điều trị khoa Cơ xương khớp, Bệnh viện Bạch Mai
                                    Hiện đang là Phó Chủ tịch Hội khớp học Hà Nội</p>
                                <p className='flex gap-1 items-center text-gray-500'>
                                    <MdLocationOn />
                                    <span>Hà Nội</span>
                                </p>
                            </div>
                        </div>
                        <div className='px-4'>
                            <Select style={{ width: 150 }} defaultValue="1">
                                <Select.Option value="1">Thứ 7-3/3</Select.Option>
                                <Select.Option value="2">Thứ 6-2/3</Select.Option>
                                <Select.Option value="3">Thứ 5-1/3</Select.Option>
                            </Select>
                            <h3 className='flex gap-1 items-center uppercase my-2'>
                                <MdDateRange />
                                Lịch khám
                            </h3>
                            <div className='grid grid-cols-5 gap-3'>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                                <a className='bg-gray-100 py-3 text-center text-gray-800 text-sm font-medium'>17:30-18:30</a>
                            </div>
                            <p className='text-gray-700 text-sm pt-1.5 my-1 border-b border-gray-200 pb-2.5 flex items-center'>
                                Chọn và đặt <TbHandFinger className='mx-0.5 text-black' /> (Phí đặt lịch 0đ)
                            </p>
                            <div className='leading-6 border-b border-gray-200 pb-2'>
                                <p className='uppercase text-gray-500 font-medium'>Địa chỉ khám</p>
                                <p className='font-semibold'>Phòng khám Cơ xương khớp bảo Ngọc</p>
                                <p>Số 73 ngõ 109 Hoàng Ngân - Thanh Xuân - Hà Nội</p>
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
                                                <p className="text-gray-600">Phòng khám không áp dụng thanh toán bảo hiểm y tế</p>
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
            </div>
        </div>
    )
}

export default MedExamination