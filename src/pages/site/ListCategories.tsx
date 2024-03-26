import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { LstCategories } from "../../interface/ListCategories";
import { convertToSlug } from "../../utils/convertToSlug";
import { useGetProvincesQuery } from "../../api/share/area";
import { Input, Select, Pagination, Spin, Form, Button } from "antd";
import { Option } from "antd/es/mentions";
import { IProvinces } from "../../interface/Area";
import { useSearchClinicsMutation } from "../../api/site/Clinics";
import { useSearchAllSpecialtyMutation } from "../../api/admin/Specialty";
import { useSearchDoctorsMutation } from "../../api/admin/Doctor";

const ListCategories = () => {
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const data = location.state;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectData, setSelectData] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    const { data: provinces } = useGetProvincesQuery();
    const [searchClinics, { data: clinics, isLoading: clinicsLoading }] = useSearchClinicsMutation();
    const [searchSpecialty, { data: specialty, isLoading: specialtyLoading }] = useSearchAllSpecialtyMutation();
    const [searchDoctor, { data: doctor, isLoading: doctorLoading }] = useSearchDoctorsMutation();


    useEffect(() => {
        if (data.slug === "clinics") {
            searchClinics({ search: '', province: '', status: '1', page: currentPage - 1, resultLimit: 10 });
        } else if (data.slug === "specialty") {
            searchSpecialty({ name: '', status: '1', page: currentPage - 1, resultLimit: 10 });
        } else if (data.slug === "doctor") {
            searchDoctor({ name: "", clinic: "", speciality: "", page: currentPage - 1, resultLimit: 10 })
        }
    }, [data.slug, currentPage, searchSpecialty, searchClinics, searchDoctor]);

    useEffect(() => {
        if (clinics) {
            setSelectData(clinics);
        } else if (specialty) {
            setSelectData(specialty);
        } else if (doctor) {
            setSelectData(doctor);
        }
    }, [clinics, specialty, doctor]);

    useEffect(() => {
        setIsLoading(clinicsLoading || specialtyLoading || doctorLoading);
    }, [clinicsLoading, specialtyLoading, doctorLoading]);

    const handleClick2 = (slug: string, title: string | undefined, id: string | undefined) => {
        if (slug === "clinics") {
            navigate(`/co-so-y-te/${convertToSlug(t(title || ""))}`, { state: { slug, id } });
        } else {
            navigate(`/dich-vu-y-te/${convertToSlug(t(slug))}/${convertToSlug(t(title || ""))}`, { state: { slug, id } });
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const onFinish = (values: any) => {
        if (data.slug === "clinics") {
            searchClinics({ search: values.search, province: values.province, status: '1', page: currentPage - 1, resultLimit: 10 });
        } else if (data.slug === "specialty") {
            searchSpecialty({ name: values.search, status: '1', page: currentPage - 1, resultLimit: 10 });
        }
    };

    const handleReset = () => {
        if (data.slug === "clinics") {
            searchClinics({ search: '', province: '', status: '1', page: currentPage - 1, resultLimit: 10 });
        } else if (data.slug === "specialty") {
            searchSpecialty({ name: '', status: '1', page: currentPage - 1, resultLimit: 10 });
        } else if (data.slug === "doctor") {
            searchDoctor({ name: "", clinic: "", speciality: "", page: currentPage - 1, resultLimit: 10 })
        }
        form.resetFields();
    }

    return (
        <div className="max-w-screen-xl mx-44">
            <div className="flex items-center gap-1 my-4">
                <a href="/" className="text-[#45C3D2] flex gap-1"><AiFillHome className="text-xl" />/</a>
                <p className="font-light">{t(data.slug)}</p>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl mt-2 mb-4">{t(data.slug)}</h2>
                <Form layout="inline" onFinish={onFinish} form={form}>
                    <Form.Item name="province" initialValue="" className="mr-2">
                        {data.slug === "clinics" && (
                            <Select showSearch style={{ width: 150 }} placeholder="Chọn tỉnh/thành phố">
                                <Option value="">Toàn Quốc</Option>
                                {provinces &&
                                    provinces?.data?.map((province: IProvinces) => (
                                        <Option key={province.code} value={province.name}>
                                            {i18n.language === "vi" ? province.name : province.nameEn}
                                        </Option>
                                    ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item name="search">
                        <Input placeholder="Tìm kiếm" prefix={<AiOutlineSearch />} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className="bg-blue-500" htmlType="submit">Tìm kiếm</Button>
                    </Form.Item>
                    <Form.Item>
                        {/* Nút reset */}
                        <Button onClick={handleReset}>Reset</Button>
                    </Form.Item>
                </Form>
            </div>
            <Spin spinning={isLoading}>
                <div className="grid grid-cols-1 gap-4 ">
                    {selectData?.data?.data?.map((item: LstCategories, index: number) => (
                        <button onClick={() => handleClick2(data.slug, item.name, item.id)} key={index} className="flex items-center gap-6 border-b-2 border-gray-200 pb-2">
                            <img src={item.imageUrl} alt={item.name} className="w-40 h-24 object-cover" />
                            <div className="text-start">
                                <p className="text-xl mb-1.5">{item.name || item.doctorName}</p>
                                <p className="">{item?.specialityName}</p>
                            </div>
                        </button>
                    ))}

                    <div className="flex justify-center">
                        <Pagination
                            current={currentPage}
                            total={selectData?.data?.totalItems}
                            pageSize={10}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default ListCategories;
