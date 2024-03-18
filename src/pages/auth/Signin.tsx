import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { AuthSignin, useSigninMutation } from '../../api/share/Auth';
import { Notifn } from '../../components/Notification';


const Signin = () => {
    const [signin] = useSigninMutation();

    const onFinish = async (values: AuthSignin) => {
        try {
            const { email, password } = values;
            const rememberMe = true;
            const response = await signin({ email, password, rememberMe }).unwrap();

            // Lấy token từ kết quả trả về
            const accessToken = response?.data?.token;
            const refreshToken = response?.data?.refreshToken;
            console.log(accessToken);

            // Lưu token vào localStorage
            if (accessToken && refreshToken) {
                localStorage.setItem('token', accessToken);
                localStorage.setItem('rfToken', refreshToken);
                Notifn("success", "Thành công", "Đăng nhập thành công");
            } else {
                throw new Error('Không có dữ liệu token hoặc refreshToken');
            }
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Notifn("error", "Lỗi", (error as any).data || 'Có lỗi xảy ra');
        }
    };

    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside
                    className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-4"
                >
                    <img
                        alt="Pattern"
                        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                </aside>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-8">
                    <div className="max-w-xl">
                        <Link className="block text-blue-600" to="/">
                            <img src="https://cdn.youmed.vn/wp-content/themes/youmed/images/favicon.svg" className="w-20" alt="" />
                        </Link>
                        <path d="M73.11 125.24A52.13 52.13 0 0 1 21 74.49V21.88a73.09 73.09 0 1 0 107.67 98.74L112.71 107a52 52 0 0 1-39.6 18.24M73.11 0A72.82 72.82 0 0 0 44.3 5.91l-.3.15a3.76 3.76 0 0 0-2.13 3.37v22A52.14 52.14 0 0 1 113.36 40l16.19-13.33A73 73 0 0 0 73.11 0" className="bookingcare-2020_svg__cls-1"></path>
                        <h1 className="mt-6 text-2xl font-bold text-blue-500 sm:text-3xl md:text-4xl">Chào mừng bạn quay trở lại!!</h1>
                        <p className="mt-4 leading-relaxed text-gray-800">
                            Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ tuyển dụng ứng dụng sâu AI & Hiring Funnel
                        </p>

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
                            <Form.Item>
                                <Link className="login-form-forgot float-right text-blue-500 hover:text-blue-800 hover:underline" to="/business/forgot">
                                    Quên mật khẩu ??
                                </Link>
                            </Form.Item>

                            <Form.Item className='text-center'>
                                <Button type="primary" htmlType="submit" className="bg-blue-500 w-full" style={{ height: '45px' }}>
                                    Đăng nhập
                                </Button>
                                <p className='my-2'>Hoặc</p>
                                <p>Chưa có tài khoản? <Link to="/register" className='text-blue-500 hover:text-blue-800 hover:underline'>Đăng ký ngay</Link></p>

                            </Form.Item>
                        </Form>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default Signin