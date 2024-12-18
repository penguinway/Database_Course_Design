import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom'; // 用于跳转到其他页面

const { TextArea } = Input;

const AddPosition: React.FC = () => {
const navigate = useNavigate(); // 用于跳转
const [loading, setLoading] = useState<boolean>(false);

// 提交表单
const onFinish = async (values: any) => {
    setLoading(true); // 开始加载
    const data = {
    ...values,
    };
    
    try {
    // 发送 POST 请求到 API
    await axios.post('http://localhost:8000/api/positions/add/', data);
    message.success('添加成功!');
    navigate(`/position-records/all-position`); // 成功后跳转到人员详情页
    } catch (error) {
    message.error('添加失败，请稍后再试');
    } finally {
    setLoading(false); // 完成加载
    }
};

return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
    <h2>添加岗位</h2>
    <Form
        name="add-position"
        layout="vertical"
        onFinish={onFinish}
    >
        <Form.Item
        label="岗位名"
        name="name"
        rules={[{ required: true, message: '请输入岗位名' }]}
        >
        <Input placeholder="请输入岗位名" />
        </Form.Item>

        <Form.Item
        label="岗位描述"
        name="description"
        rules={[{ required: false, message: '请输入岗位描述' }]}
        >
        <TextArea placeholder="请输入岗位描述" />
        </Form.Item>

        <Form.Item 
            label="职责" 
            name="responsibilities"
            rules={[{ required: false, message: '请输入职责' }]}
        >
            <TextArea placeholder="请输入职责" />
        </Form.Item>

        <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            提交
        </Button>
        </Form.Item>
    </Form>
    </div>
);
};

export default AddPosition;
