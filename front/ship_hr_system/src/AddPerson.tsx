import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom'; // 用于跳转到其他页面
import dayjs from 'dayjs'; // 用于处理日期

const { Option } = Select;

const AddPerson: React.FC = () => {
  const navigate = useNavigate(); // 用于跳转
  const [loading, setLoading] = useState<boolean>(false);

  // 提交表单
  const onFinish = async (values: any) => {
    setLoading(true); // 开始加载
    const data = {
      ...values,
      date_of_birth: dayjs(values.date_of_birth).format('YYYY-MM-DD'), // 格式化日期
    };
    
    try {
      // 发送 POST 请求到 API
      const response = await axios.post('http://localhost:8000/api/persons/add/', data);
      message.success('添加成功!');
      navigate(`/employee-management/employee-detail/${response.data.employee_id}`); // 成功后跳转到人员详情页
    } catch (error) {
      message.error('添加失败，请稍后再试');
    } finally {
      setLoading(false); // 完成加载
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>添加人员</h2>
      <Form
        name="add-person"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          gender: '男', // 默认值
        }}
      >
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>

        <Form.Item
          label="出生日期"
          name="date_of_birth"
          rules={[{ required: true, message: '请选择出生日期' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="请选择出生日期"
          />
        </Form.Item>

        <Form.Item label="性别" name="gender">
          <Select placeholder="请选择性别">
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="身份证号"
          name="ID_number"
          rules={[{ required: true, message: '请输入身份证号' }]}
        >
          <Input placeholder="请输入身份证号" />
        </Form.Item>

        <Form.Item label="联系方式" name="Contact">
          <Input placeholder="请输入联系方式" />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: false, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱' }]}
        >
          <Input placeholder="请输入邮箱" />
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

export default AddPerson;
