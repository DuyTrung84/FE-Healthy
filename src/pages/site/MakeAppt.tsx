import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Card, Empty, Form, Input, Modal, Radio, Spin } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { useGetBookingByIdQuery } from "../../api/admin/Booking";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthSignin, useSigninMutation } from "../../api/share/Auth";
import { Notifn } from "../../components/Notification";
import Meta from "antd/es/card/Meta";
import { useGetAllProfileQuery } from "../../api/site/Profile";
import { TbBrandReason } from "react-icons/tb";
import { useCreateFreeOrderMutation, useCreatePaymentMutation } from "../../api/site/Payment";

const MakeAppt = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: bookingData, isLoading: bookingById } = useGetBookingByIdQuery(id || "")
    const [signin, { isLoading }] = useSigninMutation();
    const { data: profiles, isLoading: loadingProfile } = useGetAllProfileQuery();
    const [paymentFree, { isLoading: paymentFreeLoading }] = useCreateFreeOrderMutation();
    const [payment, { isLoading: paymentLoading }] = useCreatePaymentMutation();

    const onFinish = async (values: AuthSignin) => {
        try {
            const { email, password } = values;
            const rememberMe = true;
            const response = await signin({ email, password, rememberMe }).unwrap();

            // Lấy token từ kết quả trả về
            const accessToken = response?.data?.token;
            const refreshToken = response?.data?.refreshToken;
            const role = response?.data?.role;

            // Lưu token vào localStorage
            if (accessToken && refreshToken) {
                localStorage.setItem('token', accessToken);
                localStorage.setItem('rfToken', refreshToken);
                localStorage.setItem('role', role || "");
                Notifn("success", "Thành công", "Đăng nhập thành công");
                setIsModalOpen(false);
                window.location.reload();
                if (role === "ADMIN") {
                    navigate("/admin");
                } if (role === "DOCTOR") {
                    navigate("/doctor");
                }
            } else {
                throw new Error('Không có dữ liệu token hoặc refreshToken');
            }
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Notifn("error", "Lỗi", (error as any).data || 'Có lỗi xảy ra');
        }
    };

    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */ }
    const onSubmit = (values: any) => {
        console.log({ ...values, idSchedule: id });
        if (bookingData?.data?.whoPay === "1") {
            paymentFree({ ...values, idSchedule: id })
                .unwrap()
                .then(() => {
                    Notifn("success", "Thành công", "Đặt lịch thành công!");
                    navigate("/vnpay_return");
                })
                .catch((error) => {
                    console.error(error);
                    Notifn("warning", "Cảnh báo", error.data.message || error.data);
                });
        } else {
            payment({ ...values, idSchedule: id })
                .unwrap()
                .then((response) => {
                    console.log(response?.data.url);
                    window.location.href = response.data.url;
                })
                .catch((error) => {
                    console.error(error);
                    Notifn("warning", "Cảnh báo", error.data.message || error.data);
                });
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const hiddenModal = () => {
        setIsModalOpen(false);
    };


    return (
        <Spin spinning={bookingById}>
            <div className="bg-gray-100 py-8">
                <div className="flex gap-4 items-start max-w-screen-md mx-auto px-12">
                    <img src={bookingData?.data?.doctorImg} alt="" className="w-28 h-28 rounded-full" />
                    <div className="text-gray-700 brightness-125">
                        <p className="uppercase">Đặt lịch khám</p>
                        <p className="text-blue-600 font-medium text-lg">{bookingData?.data?.doctorName}</p>
                        <p>{bookingData?.data?.startTime} - {bookingData?.data?.endTime} - {bookingData?.data?.date}</p>
                        <p dangerouslySetInnerHTML={{ __html: bookingData?.data?.price || '' }} />
                    </div>
                </div>
            </div>
            {role === "USER" ? (
                <div className="max-w-screen-md mx-auto my-8">
                    <Form
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        onFinish={onSubmit}
                    >
                        <Form.Item
                            label="Lý do khám"
                            name="reasonBooking"
                            rules={[
                                { required: true, message: 'Vui lòng nhập lý do khám!' },
                            ]}
                        >
                            <div style={{ position: 'relative' }}>
                                <Input.TextArea
                                    placeholder="Nhập lý do khám"
                                    style={{ paddingLeft: '40px' }}
                                    className="py-1"
                                />
                                <TbBrandReason style={{ position: 'absolute', top: '10px', left: '19px' }} />
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="Chọn hồ sơ khám bệnh"
                            name="idProfile"
                            initialValue={null}
                            rules={[{ required: true, message: 'Vui lòng chọn một hồ sơ!' }]}
                        >
                            <Radio.Group>
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {profiles?.data?.length === 0 ? (
                                    <Empty
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{ height: 60 }}
                                        description="Bạn chưa có hồ sơ bệnh nhân nào !!"
                                    >
                                        <Button type="primary">Thêm hồ sơ bệnh nhân</Button>
                                    </Empty>
                                ) : (
                                    <Radio.Group>
                                        {profiles?.data.map((item: any) => (
                                            <Radio key={item.id} value={item.id} style={{ margin: '0 8px 8px 0' }} >
                                                <Card style={{ width: 320 }} loading={loadingProfile}>
                                                    <Meta
                                                        avatar={<Avatar src={item.imgUrl} size={46} />}
                                                        title={item.fullName}
                                                        description={item.genderValue || ''}
                                                    />
                                                </Card>
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                )}
                            </Radio.Group>
                        </Form.Item>

                        <div className="bg-gray-50 p-4">
                            <div className="flex justify-between items-center mb-2">
                                <p>Giá khám</p>
                                <p>Khám và thanh toán ở cơ sở y tế</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Phí đặt lịch</p>
                                <p>
                                    {bookingData?.data?.whoPay === "1" ? (
                                        "Miễn phí"
                                    ) : (
                                        <span className="text-red-500">
                                            {Number(bookingData?.data?.bookingFee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <p className="my-4 text-gray-500 text-center">Quý khách nếu có phải chịu phí đặt lịch thì khi đặt sẽ chỉ thanh toán phí đặt lịch trước</p>
                        <div className="bg-[#D4EFFC] py-4 px-8 leading-8 mb-8">
                            <p className="font-medium text-lg uppercase">Lưu ý</p>
                            <p>Thông tin anh/chị vui lòng cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi điền thông tin anh/chị vui lòng:</p>
                            <ul className="list-disc pl-4 ml-4">
                                <li><span>Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn Phú </span></li>
                                <li><span>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Xác nhận" </span></li>
                            </ul>
                        </div>

                        <Form.Item labelAlign="left">
                            <Button type="primary" htmlType="submit" className="bg-blue-500 w-full" size="large" loading={paymentFreeLoading || paymentLoading}>
                                Xác nhận đặt khám
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ) : (
                <div className="max-w-screen-md mx-auto my-8">
                    <Button onClick={showModal} type="primary" className="bg-blue-500 w-full text-white items-center flex justify-center" size="large">
                        <UserOutlined /> Đăng nhập để đặt lịch
                    </Button>
                </div>
            )}

            <Modal width={500} open={isModalOpen} footer={null} onCancel={hiddenModal}>
                <section className="bg-white">
                    <h1 className="font-bold text-blue-500 text-3xl p-4">Đăng nhập </h1>
                    <main className="flex items-center justify-center mt-2">
                        <Form
                            name="normal_login"
                            className="login-form"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email không được bỏ trống!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon p-3" />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item

                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được bỏ trống!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon p-3" />}
                                    type="password"
                                    placeholder="Mật khẩu"
                                />
                            </Form.Item>


                            <Form.Item className='text-center'>
                                <Button type="primary" htmlType="submit" className="bg-blue-500 w-full" style={{ height: '45px' }} loading={isLoading}>
                                    Đăng nhập
                                </Button>
                                <p className='my-2'>Hoặc</p>
                                <p>Chưa có tài khoản? <Link to="/register" className='text-blue-500 hover:text-blue-800 hover:underline'>Đăng ký ngay</Link></p>

                            </Form.Item>
                        </Form>

                    </main>
                </section>
            </Modal>
        </Spin >
    )
}

export default MakeAppt