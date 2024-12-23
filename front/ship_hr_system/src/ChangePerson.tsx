import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, message, Result } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const { Option } = Select;

const ChangePersonDetail: React.FC = () => {
  const [form] = Form.useForm();
  const { employeeId } = useParams(); // 获取路径中的 employee_id
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('employee_id:', employeeId);
    // 获取当前员工信息
    const fetchPersonDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/persons/detail/?person_id=${employeeId}`);
        const personData = response.data;
        // 填充表单数据
        form.setFieldsValue({
          name: personData.name,
          date_of_birth: dayjs(personData.date_of_birth),
          gender: personData.gender,
          ID_number: personData.ID_number,
          Contact: personData.Contact,
          email: personData.email,
        });
      } catch (error) {
        message.error('无法加载员工信息');
        setError("无法加载员工信息");
      }
    };

    if (employeeId) {
      fetchPersonDetail();
    }
  }, [employeeId, form]);

  // 处理表单提交
  const onFinish = async (values: any) => {
    setLoading(true);

    const data = {
      ...values,
      date_of_birth: values.date_of_birth.format('YYYY-MM-DD'), // 格式化日期
      person_id: employeeId,
    };

    try {
      const response = await axios.post(`http://localhost:8000/api/persons/change/`, data);
      message.success('人员信息更新成功');
      navigate(`/employee-management/employee-detail/${response.data.employee_id}`); // 更新后跳转到人员详情页
    } catch (error) {
      message.error('更新失败，请稍后再试');
      setError("人员更新失败");
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  if (success && !error) {
    return (
      <div>
        <Result
        status="success"
        title={success ? "修改成功" : "修改失败"}
        subTitle="您已成功修改了人员信息"
        />
      </div>
    );
  }

  return (
    <div>
      <h2>修改人员信息</h2>
      <Form
        form={form}
        name="change-person-form"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          gender: '男', // 默认值
        }}
      >
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="出生日期"
          name="date_of_birth"
          rules={[{ required: true, message: '请选择出生日期' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="性别"
          name="gender"
          rules={[{ required: true, message: '请选择性别' }]}
        >
          <Select>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="身份证号"
          name="ID_number"
          rules={[{ required: true, message: '请输入身份证号' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="联系方式"
          name="Contact"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ type: 'email', message: '请输入有效的邮箱地址' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            提交修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePersonDetail;
