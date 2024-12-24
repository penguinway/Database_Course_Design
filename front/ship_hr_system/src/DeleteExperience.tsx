import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Button, Card, message, Spin, Typography, Descriptions, Result, Space } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;
const { Option } = Select;

interface Person {
    employee_id: number;
    name: string;
    age: number;
    gender: string;
}

interface Experience {
    experience_id: number;
    company_name: string;
    position: string;
    start_date: string;
    end_date: string;
}

const DeleteExperience: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
    const [experience, setExperience] = useState<Experience[]>([]);
    const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(null);
    const [loadingPersons, setLoadingPersons] = useState<boolean>(true);
    const [loadingExperience, setLoadingExperience] = useState<boolean>(false);
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
        setError('无法加载工作经历');
      } finally {
        setLoadingExperience(false);
      }
    };

    fetchExperience();
  }, [selectedPersonId]);

  const handleFinish = async (selectedExperienceId: number) => {
    if (!selectedExperienceId) {
      message.warning('请选择一条工作经历进行删除');
      return;
    }

    const payload = {
      experience_id: selectedExperienceId,
    };

    try {
      await axios.post('http://localhost:8000/api/experience/delete/', payload);
      message.success('工作经历删除成功');
    } catch (err) {
      console.error('Error changing experience:', err);
      message.error('删除工作经历失败');
      setError('删除工作经历失败');
    } finally {
      setSuccess(true);
    }
  };

  const handleReload = () => {
    setSelectedPersonId(null);
    setSelectedExperienceId(null);
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
          subTitle="您已成功删除了工作经历"
          extra={
            <Space size='middle'>
              <Button type="primary" onClick={handleReload}> <Text>继续</Text> </Button>
              <Button type="primary" onClick={handleBackHomePage}> <Text>返回主页</Text> </Button>
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
                  {exp.company_name} ({exp.position}), {dayjs(exp.start_date).format('YYYY-MM')} 至 {dayjs(exp.end_date).format('YYYY-MM')}
                </Option>
              ))}
            </Select>
          )}
        </Card>
      )}

      {/* Modify experience Form */}
      {selectedExperienceId && (
        <Card title="删除工作经历" bordered={false}>
          <Descriptions bordered>
            <Descriptions.Item label="工作经历ID">{selectedExperienceId}</Descriptions.Item>
            <Descriptions.Item label="公司名称">
              {experience.find((exp) => exp.experience_id === selectedExperienceId)?.company_name}
            </Descriptions.Item>
            <Descriptions.Item label="职位">
              {experience.find((exp) => exp.experience_id === selectedExperienceId)?.position}
            </Descriptions.Item>
            <Descriptions.Item label="开始时间">
              {experience.find((exp) => exp.experience_id === selectedExperienceId)?.start_date}
            </Descriptions.Item>
            <Descriptions.Item label="结束时间">
              {experience.find((exp) => exp.experience_id === selectedExperienceId)?.end_date}
            </Descriptions.Item>
          </Descriptions>
          <Button type="primary" onClick={() => handleFinish(selectedExperienceId)}>
          <Text>
            删除
          </Text>
        </Button>
        </Card>
      )}
    </div>
  );
};

export default DeleteExperience;
