import { Link, useNavigate, useParams } from "react-router-dom";
import { EnterOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Spin, Upload } from 'antd';
import { useUploadMutation } from "../../../api/share/upload";
import { useEffect, useState } from "react";
import { ISpecialty } from "../../../interface/Specialty";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useGetByIdSpecialtyQuery, useUpdateSpecialtyMutation } from "../../../api/admin/Specialty";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Notifn } from "../../../components/Notification";

const UpdateSpecialty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { data: specialtyData, isLoading: loadingData } = useGetByIdSpecialtyQuery(id || "");
    console.log(specialtyData)
    const [imageUrl, setImageUrl] = useState<string | null>(null);//Lưu link ảnh
    const [fileImg, setFile] = useState<File | null>(null);//Lưu file ảnh
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [uploadImage, { isLoading }] = useUploadMutation();
    const [updateSpecialty] = useUpdateSpecialtyMutation();

    useEffect(() => {
        form.setFieldsValue({
            descriptionHtml: specialtyData?.data?.descriptionHtml,
            name: specialtyData?.data?.name,
            imageObjectId: ""
        });
        if (specialtyData?.data?.imageUrl) {
            setImageUrl(specialtyData?.data?.imageUrl);
        }
    }, [specialtyData]);


    const handleUpload = async (file: File) => {
        setFile(file)
        setIsImageUploading(true);
        setTimeout(() => {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            setIsImageUploading(false);
        }, 2000);
    };

    const onFinish = async (values: ISpecialty) => {
        try {
            delete values.imageObjectId;
            if (fileImg == null) {
                await updateSpecialty({ ...values, id: id })
                Notifn("success", "Thành công", "Cập nhật thành công");
                navigate("/admin/quan-ly-chuyen-khoa");
            } else {
                const response = await updateSpecialty({ ...values, id: id });
                const responseData = response?.data?.data;
                const formData = new FormData();
                if (fileImg) {
                    formData.append('image', fileImg);
                }
                if (responseData) {
                    formData.append('id', responseData);
                }
                await uploadImage(formData);
                Notifn("success", "Thành công", "Cập nhật thành công");
                navigate("/admin/quan-ly-chuyen-khoa");
            }
        } catch (error) {
            console.error('Error adding specialty:', error);
            Notifn("error", "Lỗi", "Thêm không thành công");
        }
    };

    return (
        <div className="">
            <Link to="/admin/quan-ly-chuyen-khoa">Quay lại <EnterOutlined /></Link>
            <h2 className="my-6 mx-16 text-2xl font-semibold">Cập nhật chuyên khoa</h2>
            <Spin spinning={loadingData}>
                <Form className="mx-40"
                    form={form}
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onFinish}
                    labelWrap={true}
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Tên chuyên khoa"
                                name="name"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    { min: 3, message: "Tối thiểu 3 ký tự!" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Ảnh"
                                name="imageObjectId"
                            >
                                <Upload
                                    beforeUpload={(file) => { handleUpload(file) }}
                                    showUploadList={false}
                                    listType="picture-card" // Thay đổi kiểu hiển thị thành avatar
                                    accept="image/*"
                                >
                                    {imageUrl ? (
                                        isImageUploading ? (
                                            <div>
                                                <LoadingOutlined />
                                                <div style={{ marginTop: 8 }}>Đang tải ảnh...</div>
                                            </div>
                                        ) : (
                                            <img src={imageUrl} alt="Ảnh đã upload" style={{ width: '100%' }} />
                                        )
                                    ) : (
                                        <div>
                                            {isImageUploading ? (
                                                <div>
                                                    <LoadingOutlined />
                                                    <div style={{ marginTop: 8 }}>Đang tải ảnh...</div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <PlusOutlined />
                                                    <div style={{ marginTop: 8 }}>Upload</div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="descriptionHtml"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                    >
                        <CKEditor
                            data={specialtyData?.data?.descriptionHtml}
                            editor={ClassicEditor}
                            onChange={(_event, editor) => {
                                const data = editor.getData();
                                form.setFieldsValue({
                                    descriptionHtml: data
                                });
                            }}
                        />
                    </Form.Item>

                    <Form.Item labelAlign="left">
                        <Button type="primary" htmlType="submit" className="bg-blue-500">
                            {isLoading ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            ) : (
                                "Cập nhật"
                            )}
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
};

export default UpdateSpecialty;
