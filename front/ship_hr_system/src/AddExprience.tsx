import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Form, Input, DatePicker, Button, Card, message, Spin, Result, Typography, Space } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom'

const { Text } = Typography;
const { Option } = Select;

interface Person {
  employee_id: number;
  name: string;
  date_of_birth: string;
  gender: string;
  age: number;
  ID_number: string;
  Contact: string;
  email: string;
  position: number[];
}

const AddExprience: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [loadingPersons, setLoadingPersons] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigator = useNavigate();

  useEffect(() => {
    // Fetch the list of persons on component mount
    const fetchPersons = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/persons/');
        setPersons(response.data);
      } catch (err) {
        console.error('Error fetching persons:', err);
        message.error('无法加载人员信息');
        setError('无法加载人员信息');
      } finally {
        setLoadingPersons(false);
      }
    };

    fetchPersons();
  }, []);

  const handlePersonChange = (value: number) => {
    setSelectedPersonId(value);
  };

  const handleFinish = async (values: any) => {
    if (!selectedPersonId) {
      message.warning('请选择一个人员');
      return;
    }

    const payload = {
      person_id: selectedPersonId,
      company_name: values.company_name,
      position: values.position,
      start_date: dayjs(values.dates[0]).format('YYYY-MM-DD'),
      end_date: dayjs(values.dates[1]).format('YYYY-MM-DD'),
    };

    setLoading(true);

    try {
      await axios.post('http://localhost:8000/api/persons/experience/add/', payload);
      message.success('工作经历添加成功');
    } catch (err) {
      console.error('Error adding education:', err);
      message.error('添加工作经历失败');
      setError('添加工作经历失败');
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  const handleReload = () => {
    setSelectedPersonId(null);
    setSuccess(false);
    setError(null);
  };

  const handleBackHomePage = () => {
    navigator(`/`);
  };

  if (success && !error) {
        return (
          <div>
            <Result
            status="success"
            title={success ? "添加成功" : "添加失败"}
            subTitle="您已成功添加了工作经历"
            extra = {
              <Space size="middle">
                <Button type="primary" onClick={handleReload}> <Text>继续</Text> </Button>
                <Button type="primary" onClick={handleBackHomePage}> <Text>返回首页</Text> </Button>
              </Space>
            }
            />
          </div>
        );
      }

  return (
    <div>
      <Card title="选择人员" bordered={false} style={{ marginBottom: '24px' }}>
        {loadingPersons ? (
          <Spin size="large" />
        ) : (
          <Select
            placeholder="请选择一个人员"
            style={{ width: '100%' }}
            onChange={handlePersonChange}
          >
            {persons.map((person) => (
              <Option key={person.employee_id} value={person.employee_id}>
                ID:{person.employee_id} - 姓名:{person.name}
              </Option>
            ))}
          </Select>
        )}
      </Card>

      {selectedPersonId && (
        <Card title="添加工作经历" bordered={false}>
          <Form
            layout="vertical"
            onFinish={handleFinish}
          >
            <Form.Item
              label="公司名称"
              name="company_name"
              rules={[{ required: true, message: '请输入公司名称' }]}
            >
              <Input placeholder="请输入公司名称" />
            </Form.Item>

            <Form.Item
              label="岗位"
              name="position"
              rules={[{ required: true, message: '请输入岗位' }]}
            >
              <Input placeholder="请输入工作岗位名称" />
            </Form.Item>

            <Form.Item
              label="起止日期"
              name="dates"
              rules={[{ required: true, message: '请选择起止日期' }]}
            >
              <DatePicker.RangePicker 
                format="YYYY-MM-DD"
                style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                添加工作经历
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default AddExprience;
