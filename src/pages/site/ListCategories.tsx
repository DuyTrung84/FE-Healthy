import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { LstCategories } from "../../interface/ListCategories";
import { convertToSlug } from "../../utils/convertToSlug";
import { useGetProvincesQuery } from "../../api/share/area";
import { Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { IProvinces } from "../../interface/Area";

const ListCategories = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const data = location.state;

    const { data: provinces } = useGetProvincesQuery();

    const [searchInput, setSearchInput] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");

    const handleClick2 = (slug: string, title: string | undefined, id: string | undefined) => {
        if (slug === "clinics") {
            navigate(`/co-so-y-te/${convertToSlug(t(title || ""))}`, { state: { slug, id } });
        } else {
            navigate(`/dich-vu-y-te/${convertToSlug(t(slug))}/${convertToSlug(t(title || ""))}`, { state: { slug, id } });
        }
    };

    const filteredData = data?.data.filter((item: LstCategories) => {
        const nameMatch = item.name.toLowerCase().includes(searchInput.toLowerCase());
        const addressMatch = selectedProvince === "" || item.address.toLowerCase().includes(selectedProvince.toLowerCase());
        return nameMatch && addressMatch;
    });

    return (
        <div className="max-w-screen-xl mx-44">
            <div className="flex items-center gap-1 my-4">
                <a href="/" className="text-[#45C3D2] flex gap-1"><AiFillHome className="text-xl" />/</a>
                <p className="font-light">{t(data.slug)}</p>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl mt-2 mb-4">{t(data.slug)}</h2>
                {data.slug === "clinics" && (
                    <div>
                        <Select
                            showSearch
                            defaultValue=""
                            style={{ width: 150 }}
                            placeholder="Chọn tỉnh/thành phố"
                            optionFilterProp="children"
                            onChange={(value) => setSelectedProvince(value)}
                        >
                            <Option value="">Toàn Quốc</Option>
                            {provinces &&
                                provinces.map((province: IProvinces) => (
                                    <Option key={province.code} value={province.name}>
                                        {i18n.language === "vi" ? province.name : province.nameEn}
                                    </Option>
                                ))}
                        </Select>
                        <Input
                            style={{ width: 200, marginLeft: 10 }}
                            placeholder="Tìm kiếm"
                            prefix={<AiOutlineSearch />}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 gap-4 ">
                {filteredData?.length ? (
                    filteredData.map((item: LstCategories, index: number) => (
                        <button onClick={() => handleClick2(data.slug, item.name, item.id)} key={index} className="flex items-center gap-6 border-b-2 border-gray-200 pb-2">
                            <img src={item.imageUrl} alt={item.name} className="w-40 h-24 object-cover" />
                            <div>
                                <p className="text-xl mb-1.5">{item.name}</p>
                                <p className="">{item?.descriptionHtml}</p>
                            </div>
                        </button>
                    ))
                ) : (
                    <p className="text-red-500 font-semibold text-lg ml-3">Không tìm thấy cơ sở y tế phù hợp.</p>
                )}
            </div>
        </div>
    )
}

export default ListCategories;
