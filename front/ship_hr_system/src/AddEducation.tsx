import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Form, Input, DatePicker, Button, Card, message, Spin } from 'antd';
import dayjs from 'dayjs';

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

const AddEducation: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [loadingPersons, setLoadingPersons] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch the list of persons on component mount
    const fetchPersons = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/persons/');
        setPersons(response.data);
      } catch (err) {
        console.error('Error fetching persons:', err);
        message.error('无法加载人员信息');
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
      institution: values.institution,
      degree: values.degree,
      major: values.major,
      start_date: dayjs(values.dates[0]).format('YYYY-MM-DD'),
      end_date: dayjs(values.dates[1]).format('YYYY-MM-DD'),
    };

    setLoading(true);

    try {
      await axios.post('http://localhost:8000/api/persons/education/add/', payload);
      message.success('教育经历添加成功');
    } catch (err) {
      console.error('Error adding education:', err);
      message.error('添加教育经历失败');
    } finally {
      setLoading(false);
    }
  };

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
        <Card title="添加教育经历" bordered={false}>
          <Form
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              dates: [dayjs(), dayjs().add(4, 'years')],
            }}
          >
            <Form.Item
              label="学校"
              name="institution"
              rules={[{ required: true, message: '请输入学校名称' }]}
            >
              <Input placeholder="请输入学校名称" />
            </Form.Item>

            <Form.Item
              label="学位"
              name="degree"
              rules={[{ required: true, message: '请输入学位' }]}
            >
              <Input placeholder="请输入学位 (如: 本科, 硕士, 博士)" />
            </Form.Item>

            <Form.Item
              label="专业"
              name="major"
              rules={[{ required: true, message: '请输入专业' }]}
            >
              <Input placeholder="请输入专业 (如: 计算机科学, 反恐)" />
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
                添加教育经历
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default AddEducation;
