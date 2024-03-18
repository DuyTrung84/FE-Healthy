import { Link, useNavigate } from "react-router-dom";
import { EnterOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Upload } from 'antd';
import { useUploadMutation } from "../../../api/share/upload";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAddSpecialtyMutation } from "../../../api/admin/Specialty";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Notifn } from "../../../components/Notification";
import { IClinics } from "../../../interface/Clinics";

const ClinicsAdd = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string | null>(null);//Lưu link ảnh
    const [imageId, setImageId] = useState<string | null>(null);//Lưu Id link ảnh
    const [uploadImage, { isLoading: isUploading }] = useUploadMutation();
    const [addSpecialty, { isLoading }] = useAddSpecialtyMutation();

    const onFinish = async (values: IClinics) => {
        try {
            values.imageObjectId = imageId ?? undefined;
            console.log(values);
            await addSpecialty(values).then(() => {
                Notifn("success", "Thành công", "Thêm thành công");
                navigate("/admin/quan-ly-chuyen-khoa");
            });
        } catch (error) {
            console.error('Error adding specialty:', error);
            Notifn("error", "Lỗi", "Thêm không thành công");
        }
    };
    const handleUpload = async (file: File) => {
        console.log(file.name)
        try {
            isUploading
            const formData = new FormData();
            formData.append('image', file);
            const response = await uploadImage(formData);
            if ('data' in response) {
                setImageId(response.data.imageObjectId);
                // Tạo đường dẫn tương đối cho ảnh
                const imageUrl = URL.createObjectURL(file);
                console.log(imageUrl);
                setImageUrl(imageUrl);
            }
        } catch (error) {
            console.log('Upload failed:');
        } finally {
            isUploading
        }
        return false;
    };
    return (
        <div className="">
            <Link to="/admin/quan-ly-chuyen-khoa">Quay lại <EnterOutlined /></Link>
            <h2 className="my-6 mx-16 text-2xl font-semibold">Tạo chuyên khoa</h2>
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
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                            ]}
                        >
                            <Upload
                                beforeUpload={(file) => { handleUpload(file) }}
                                // onChange={($event) => { upload($event) }}
                                showUploadList={false}
                                listType="picture-card" // Thay đổi kiểu hiển thị thành avatar
                                accept="image/*"
                            >
                                {imageUrl ? (
                                    <img src={imageUrl} alt="Ảnh đã upload" style={{ width: '100%' }} />
                                ) : (
                                    <div>
                                        {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div style={{ marginTop: 8 }}>Upload</div>
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
                            "Thêm"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ClinicsAdd;
