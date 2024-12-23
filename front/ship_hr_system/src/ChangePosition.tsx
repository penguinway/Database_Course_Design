import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Result } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { TextArea } = Input;

const ChangePersonDetail: React.FC = () => {
    const [form] = Form.useForm();
    const { positionId } = useParams(); // 获取路径中的 employee_id
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

  useEffect(() => {
    console.log('position_id:', positionId);
    // 获取当前员工信息
    const fetchPersonDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/positions/detail/?position_id=${positionId}`);
        const positionData = response.data;
        console.log(positionData);
        // 填充表单数据
        form.setFieldsValue({
            name: positionData.name,
            description: positionData.description,
            responsibilities: positionData.responsibilities
        });
      } catch (error) {
        message.error('无法加载岗位信息');
        setError('无法加载岗位信息');
      }
    };

    if (positionId) {
      fetchPersonDetail();
    }
  }, [positionId, form]);

  // 处理表单提交
  const onFinish = async (values: any) => {
    setLoading(true);

    const data = {
      ...values,
      "position_id": positionId,
    };

    try {
      await axios.post(`http://localhost:8000/api/positions/change/`, data);
      message.success('岗位信息更新成功');
      navigate(`/position-records/all-position`); // 更新后跳转到人员详情页
    } catch (error) {
      message.error('更新失败，请稍后再试');
      setError("岗位更新失败");
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
        subTitle="您已成功修改了岗位信息"
        />
      </div>
    );
  }

  return (
    <div>
      <h2>修改岗位信息</h2>
      <Form
        form={form}
        name="change-position"
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

export default ChangePersonDetail;
