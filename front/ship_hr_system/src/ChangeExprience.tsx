import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Form, Input, DatePicker, Button, Card, message, Spin } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

interface Person {
    employee_id: number;
    name: string;
    age: number;
    gender: string;
}

interface Education {
    experience_id: number;
    company_name: string;
    position: string;
    start_date: string;
    end_date: string;
}

const ChangeExperience: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
    const [experience, setExperience] = useState<Education[]>([]);
    const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(null);
    const [loadingPersons, setLoadingPersons] = useState<boolean>(true);
    const [loadingExperience, setLoadingExperience] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch persons list on component mount
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

  useEffect(() => {
    // Fetch experience when a person is selected
    const fetchExperience = async () => {
      if (!selectedPersonId) return;

      setLoadingExperience(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/persons/experience/detail/?person_id=${selectedPersonId}`);
        setExperience(response.data);
      } catch (err) {
        console.error('Error fetching experience:', err);
        message.error('无法加载工作经历');
      } finally {
        setLoadingExperience(false);
      }
    };

    fetchExperience();
  }, [selectedPersonId]);

  const handleFinish = async (values: any) => {
    if (!selectedExperienceId) {
      message.warning('请选择一条工作经历进行修改');
      return;
    }

    const payload = {
      experience_id: selectedExperienceId,
      company_name: values.company_name,
      position: values.position,
      start_date: values.dates[0].format('YYYY-MM-DD'),
      end_date: values.dates[1].format('YYYY-MM-DD'),
    };

    setLoading(true);

    try {
      await axios.post('http://localhost:8000/api/experience/change/', payload);
      message.success('工作经历修改成功');
    } catch (err) {
      console.error('Error changing experience:', err);
      message.error('修改工作经历失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Select Person */}
      <Card title="选择人员" bordered={false} style={{ marginBottom: '24px' }}>
        {loadingPersons ? (
          <Spin size="large" />
        ) : (
          <Select
            placeholder="请选择一个人员"
            style={{ width: '100%' }}
            onChange={(value) => setSelectedPersonId(value)}
          >
            {persons.map((person) => (
              <Option key={person.employee_id} value={person.employee_id}>
                {person.name} ({person.gender}, {person.age}岁)
              </Option>
            ))}
          </Select>
        )}
      </Card>

      {/* Select experience */}
      {selectedPersonId && (
        <Card title="选择工作经历" bordered={false} style={{ marginBottom: '24px' }}>
          {loadingExperience ? (
            <Spin size="large" />
          ) : (
            <Select
              placeholder="请选择一条工作经历"
              style={{ width: '100%' }}
              onChange={(value) => setSelectedExperienceId(value)}
            >
              {experience.map((exp) => (
                <Option key={exp.experience_id} value={exp.experience_id}>
                  {exp.company_name} ({exp.position})
                </Option>
              ))}
            </Select>
          )}
        </Card>
      )}

      {/* Modify experience Form */}
      {selectedExperienceId && (
        <Card title="修改工作经历" bordered={false}>
          <Form
            layout="vertical"
            onFinish={handleFinish}
            initialValues={
              experience.find((exp) => exp.experience_id === selectedExperienceId)
                ? {
                    company_name: experience.find((exp) => exp.experience_id === selectedExperienceId)?.company_name,
                    position: experience.find((exp) => exp.experience_id === selectedExperienceId)?.position,
                    dates: [
                      dayjs(experience.find((exp) => exp.experience_id === selectedExperienceId)?.start_date),
                      dayjs(experience.find((exp) => exp.experience_id === selectedExperienceId)?.end_date),
                    ],
                  }
                : undefined
            }
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

export default ChangeExperience;
