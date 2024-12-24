import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Button, Card, message, Spin, Descriptions, Typography, Result, Space } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Text } = Typography;

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

const DeleteEducation: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
  const [educations, setEducations] = useState<Education[]>([]);
  const [selectedEducationId, setSelectedEducationId] = useState<number | null>(null);
  const [loadingPersons, setLoadingPersons] = useState<boolean>(true);
  const [loadingEducation, setLoadingEducation] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigator = useNavigate();

  useEffect(() => {
    // Fetch persons list on component mount
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
        setError('无法加载教育经历');
      } finally {
        setLoadingEducation(false);
      }
    };

    fetchEducations();
  }, [selectedPersonId]);

  const handleFinish = async (selectedEducationId: number) => {
    if (!selectedEducationId) {
      message.error('请选择一条教育经历进行删除');
      return;
    }

    const payload = {
      education_id: selectedEducationId,
    };

    try {
      await axios.post('http://localhost:8000/api/persons/education/delete/', payload);
      message.success('教育经历删除成功');
    } catch (err) {
      console.error('Error changing education:', err);
      message.error('删除教育经历失败');
      setError('删除教育经历失败');
    } finally {
      setSuccess(true);
    }
  };

  const handleReload = () => {
    setSelectedPersonId(null);
    setSelectedEducationId(null);
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
        title={success ? "删除成功" : "删除失败"}
        subTitle="您已成功删除了教育经历"
        extra={ 
        <Space size='middle'>
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
                ID:{person.employee_id} - 姓名:{person.name}
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
        <Card title="删除教育经历" bordered={false}>
            <Descriptions bordered>
            <Descriptions.Item label="教育经历ID">{selectedEducationId}</Descriptions.Item>
            <Descriptions.Item label="学校">
              {educations.find((edu) => edu.education_id === selectedEducationId)?.institution}
            </Descriptions.Item>
            <Descriptions.Item label="学历">
              {educations.find((edu) => edu.education_id === selectedEducationId)?.degree}
            </Descriptions.Item>
            <Descriptions.Item label="专业">
              {educations.find((edu) => edu.education_id === selectedEducationId)?.major}
            </Descriptions.Item>
            <Descriptions.Item label="开始时间">
              {educations.find((edu) => edu.education_id === selectedEducationId)?.start_date}
            </Descriptions.Item>
            <Descriptions.Item label="结束时间">
              {educations.find((edu) => edu.education_id === selectedEducationId)?.end_date}
            </Descriptions.Item>
        </Descriptions>
        <Button type="primary" onClick={() => handleFinish(selectedEducationId)}>
          <Text>
            删除
          </Text>
        </Button>
        </Card>
      )}
    </div>
  );
};

export default DeleteEducation;
