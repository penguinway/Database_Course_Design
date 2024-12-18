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
  education_id: number;
  institution: string;
  degree: string;
  major: string;
  start_date: string;
  end_date: string;
}

const ChangeEducation: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [educations, setEducations] = useState<Education[]>([]);
  const [selectedEducationId, setSelectedEducationId] = useState<number | null>(null);
  const [loadingPersons, setLoadingPersons] = useState<boolean>(true);
  const [loadingEducation, setLoadingEducation] = useState<boolean>(false);
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
    // Fetch educations when a person is selected
    const fetchEducations = async () => {
      if (!selectedPersonId) return;

      setLoadingEducation(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/persons/education/detail/?person_id=${selectedPersonId}`);
        setEducations(response.data);
      } catch (err) {
        console.error('Error fetching educations:', err);
        message.error('无法加载教育经历');
      } finally {
        setLoadingEducation(false);
      }
    };

    fetchEducations();
  }, [selectedPersonId]);

  const handleFinish = async (values: any) => {
    if (!selectedEducationId) {
      message.error('请选择一条教育经历进行修改');
      return;
    }

    const payload = {
      education_id: selectedEducationId,
      institution: values.institution,
      degree: values.degree,
      major: values.major,
      start_date: values.dates[0].format('YYYY-MM-DD'),
      end_date: values.dates[1].format('YYYY-MM-DD'),
    };

    setLoading(true);

    try {
      await axios.post('http://localhost:8000/api/education/change/', payload);
      message.success('教育经历修改成功');
    } catch (err) {
      console.error('Error changing education:', err);
      message.error('修改教育经历失败');
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

      {/* Select Education */}
      {selectedPersonId && (
        <Card title="选择教育经历" bordered={false} style={{ marginBottom: '24px' }}>
          {loadingEducation ? (
            <Spin size="large" />
          ) : (
            <Select
              placeholder="请选择一条教育经历"
              style={{ width: '100%' }}
              onChange={(value) => setSelectedEducationId(value)}
            >
              {educations.map((edu) => (
                <Option key={edu.education_id} value={edu.education_id}>
                  {edu.institution} ({edu.degree}, {dayjs(edu.start_date).format('YYYY-MM')} 至 {dayjs(edu.end_date).format('YYYY-MM')})
                </Option>
              ))}
            </Select>
          )}
        </Card>
      )}

      {/* Modify Education Form */}
      {selectedEducationId && (
        <Card title="修改教育经历" bordered={false}>
          <Form
            layout="vertical"
            onFinish={handleFinish}
            initialValues={
              educations.find((edu) => edu.education_id === selectedEducationId)
                ? {
                    institution: educations.find((edu) => edu.education_id === selectedEducationId)?.institution,
                    degree: educations.find((edu) => edu.education_id === selectedEducationId)?.degree,
                    major: educations.find((edu) => edu.education_id === selectedEducationId)?.major,
                    dates: [
                      dayjs(educations.find((edu) => edu.education_id === selectedEducationId)?.start_date),
                      dayjs(educations.find((edu) => edu.education_id === selectedEducationId)?.end_date),
                    ],
                  }
                : undefined
            }
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
              <DatePicker.RangePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                修改教育经历
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default ChangeEducation;
