import { EnvironmentFilled, PhoneOutlined, UserOutlined } from "@ant-design/icons"
import { Button, DatePicker, Form, Input, Radio, RadioChangeEvent, Select } from "antd"
import { Option } from "antd/es/mentions"
import { useState } from "react";
import { useGetDistrictsQuery, useGetProvincesQuery, useGetWardsQuery } from "../../api/share/area";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const MakeAppt = () => {
    const [selectedProvince, setSelectedProvince] = useState<string>("");//Lưu mã trỉnh thành phố
    const [selectedDistricts, setSelectedDistricts] = useState<string>("");//Lưu mã quạn huyện
    const [isRelative, setIsRelative] = useState<boolean>(false);

    const { data: provinces, isLoading: loadingProvince } = useGetProvincesQuery();//Tỉnh thành phố
    const { data: districts, isLoading: loadingDistricts } = useGetDistrictsQuery(selectedProvince);//Quận huyện
    const { data: wards, isLoading: loadingWards } = useGetWardsQuery(selectedDistricts);//Phường Xã

    const handleProvinceChange = (value: string) => {
        setSelectedProvince(value); // Cập nhật mã tỉnh/thành phố được chọn
    };

    const handleDistrictsChange = (value: string) => {
        setSelectedDistricts(value); // Cập nhật mã tỉnh/thành phố được chọn
    };
    const handleRadioChange = (e: RadioChangeEvent) => {
        setIsRelative(e.target.value === "relative"); // Cập nhật trạng thái khi radio thay đổi
    };

    return (
        <div>
            <div className="bg-gray-100 py-8">
                <div className="flex gap-4 items-start max-w-screen-md mx-auto px-12">
                    <img src="https://cdn.bookingcare.vn/fo/w256/2019/03/11/163946bac-si-v-cho-ray.jpg" alt="" className="w-28 h-28 rounded-full" />
                    <div className="text-gray-700 brightness-125">
                        <p className="uppercase">Đặt lịch khám</p>
                        <p className="text-blue-600 font-medium text-lg">Khám nội tiết tại bệnh viện chợ rẫy</p>
                        <p>08:00 - 09:00 - Thứ 6 - 22/03/2024</p>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-md mx-auto my-8">
                <Form>
                    <Form.Item
                        name="check"
                    >
                        <Radio.Group onChange={handleRadioChange} defaultValue="self">
                            <Radio value="self">Đặt cho mình</Radio>
                            <Radio value="relative">Đặt cho người thân</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {isRelative && (
                        <div>
                            <h2 className="font-bold text-sm text-blue-500 mb-2">Thông tin người đặt lịch</h2>
                            <Form.Item
                                name="name"
                                rules={[{ required: isRelative, message: 'Vui lòng nhập họ tên bênh nhân' }]}
                            >
                                <Input placeholder="Tên người đặt (bắt buộc)" prefix={<UserOutlined className="p-2" />} />
                            </Form.Item>
                            <Form.Item
                                name="tel"
                                rules={[
                                    { required: isRelative, message: 'Vui lòng nhập số điện thoại' },
                                    { pattern: /^(0[0-9]{9,10})$/, message: "Số điện thoại không đúng định dạng" }
                                ]}
                            >
                                <Input placeholder="Số điện thoại ngời đặt(bắt buộc)" prefix={<PhoneOutlined className="p-2" />} />
                            </Form.Item>
                            <h2 className="font-bold text-sm text-blue-500 mb-2">Thông tin bệnh nhân</h2>
                        </div>
                    )}

                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên bênh nhân' }]}
                    >
                        <Input placeholder="Họ tên bệnh nhân (bắt buộc)" prefix={<UserOutlined className="p-2" />} />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                    >
                        <Radio.Group>
                            <Radio value="male">Nam</Radio>
                            <Radio value="female">Nữ</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="tel"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại' },
                            { pattern: /^(0[0-9]{9,10})$/, message: "Số điện thoại không đúng định dạng" }
                        ]}
                    >
                        <Input placeholder="Họ tên bệnh nhân (bắt buộc)" prefix={<PhoneOutlined className="p-2" />} />
                    </Form.Item>
                    <Form.Item
                        name="birthday"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại' },
                        ]}
                    >
                        <DatePicker placeholder="Ngày tháng năm sinh" className="w-full p-2" />
                    </Form.Item>
                    <Form.Item
                        name="province"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                        ]}
                    >
                        <Select placeholder="---Chọn tỉnh/thành phố---" className="w-full h-11" loading={loadingProvince}
                            onChange={handleProvinceChange}
                        >

                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {provinces?.data?.map((role: any) => (
                                <Option key={role.code} value={role.code}>{role.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="district"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                        ]}
                    >
                        <Select
                            placeholder="---Chọn quận/huyện---"
                            className="w-full h-11"
                            loading={loadingDistricts}
                            onChange={handleDistrictsChange}
                        >
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {districts?.data?.map((district: any) => (
                                <Option key={district.code} value={district.code} >{district.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="wards"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                        ]}
                    >
                        <Select
                            placeholder="---Chọn phường xã---"
                            className="w-full h-11"
                            loading={loadingWards}
                        >

                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {wards?.data?.map((wards: any) => (
                                <Option key={wards.code} value={wards.code}>{wards.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="address"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                        ]}
                    >
                        <Input placeholder="Nhâp địa chỉ tổ/ khu/ thôn/ xóm" prefix={<EnvironmentFilled className="p-2" />} />
                    </Form.Item>

                    <Form.Item labelAlign="left">
                        <Button type="primary" htmlType="submit" className="bg-blue-500 w-full" size="large">
                            {loadingProvince ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            ) : (
                                "Xác nhận đặt khám"
                            )}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default MakeAppt