import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Descriptions, Spin, Result, Typography } from 'antd';

const { Text } = Typography;

interface Education {
  education_id: number;
  institution: string;
  degree: string;
  major: string;
  start_date: string;
  end_date: string;
}

interface WorkExperience {
  experience_id: number;
  company_name: string;
  position: string;
  start_date: string;
  end_date: string;
}

interface Position {
  position_id: number;
  name: string;
  description: string;
  responsibilities: string;
}

interface PersonDetailProps {
  name: string;
  email: string;
  gender: string;
  date_of_birth: string;
  age: number;
  ID_number: string;
  Contact: string;
  position: number[];
  education: Education[];
  work_experience: WorkExperience[];
}

const PersonDetail: React.FC = () => {
  const { employeeId } = useParams();
  const [person, setPerson] = useState<PersonDetailProps | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [fetchedPositions, setFetchedPositions] = useState<boolean>(false);
  const [fetchedEducation, setFetchedEducation] = useState<boolean>(false);
  const [fetchedExperience, setFetchedExperience] = useState<boolean>(false);

  const fetchPositions = async (positionIds: number[]) => {
    try {
      const positionPromises = positionIds.map((id) =>
        axios.get(`http://localhost:8000/api/positions/detail/?position_id=${id}`)
      );
      const positionResponses = await Promise.all(positionPromises);
      setPositions(positionResponses.map((res) => res.data));
      setFetchedPositions(true);
    } catch (err) {
      console.error('Error fetching positions:', err);
      setError('无法加载职位信息');
    }
  };

  const fetchEducation = async (personId: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/persons/education/detail/?person_id=${personId}`);
      setEducation(response.data);
      setFetchedEducation(true);
    } catch (err) {
      console.error('Error fetching education:', err);
      setError('无法加载教育信息');
    }
  };

  const fetchExperience = async (personId: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/persons/experience/detail/?person_id=${personId}`);
      setExperience(response.data);
      setFetchedExperience(true);
    } catch (err) {
      console.error('Error fetching experience:', err);
      setError('无法加载工作经历');
    }
  };

  useEffect(() => {
    const fetchPersonDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/persons/detail/?person_id=${employeeId}`);
        setPerson({
          ...response.data,
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching person detail:', err);
        setError('无法加载人员信息');
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchPersonDetail();
    }
  }, [employeeId]);

  useEffect(() => {
    const fetchAdditionalDetails = async () => {
      if (person) {
        try {
          const positionFetch =
            !fetchedPositions
              ? fetchPositions(person.position)
              : Promise.resolve();
          const educationFetch =
            !fetchedEducation
              ? fetchEducation(employeeId!)
              : Promise.resolve();
          const experienceFetch =
            !fetchedExperience
              ? fetchExperience(employeeId!)
              : Promise.resolve();

          await Promise.all([positionFetch, educationFetch, experienceFetch]);
        } catch (err) {
          console.error('Error fetching additional details:', err);
          setError('无法加载附加信息');
        }
      }
    };

    fetchAdditionalDetails();
  }, [person, fetchedPositions, fetchedEducation, fetchedExperience]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Result status="error" title={error} />;
  }

  if (!person) {
    return <Result status="error" title="人员不存在" />;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card title="人员详情" bordered={false}>
        <Descriptions bordered>
          <Descriptions.Item label="姓名">{person.name}</Descriptions.Item>
          <Descriptions.Item label="性别">{person.gender}</Descriptions.Item>
          <Descriptions.Item label="年龄">{person.age}</Descriptions.Item>
          <Descriptions.Item label="出生日期">{person.date_of_birth}</Descriptions.Item>
          <Descriptions.Item label="身份证号">{person.ID_number}</Descriptions.Item>
          <Descriptions.Item label="联系方式">{person.Contact}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{person.email}</Descriptions.Item>
          <Descriptions.Item label="职位">
            {positions.map((position) => (
              <div key={position.position_id}>
                <strong>{position.name}</strong>
              </div>
            ))}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="教育经历" bordered={false} style={{ marginTop: '24px' }}>
        {education.length > 0 ? (
          education.map((edu) => (
            <Descriptions key={edu.education_id} bordered style={{ marginBottom: '16px' }}>
              <Descriptions.Item label="学校">{edu.institution}</Descriptions.Item>
              <Descriptions.Item label="学位">{edu.degree}</Descriptions.Item>
              <Descriptions.Item label="专业">{edu.major}</Descriptions.Item>
              <Descriptions.Item label="入学日期">{edu.start_date}</Descriptions.Item>
              <Descriptions.Item label="毕业日期">{edu.end_date}</Descriptions.Item>
            </Descriptions>
          ))
        ) : (
          <Text>无教育经历</Text>
        )}
      </Card>

      <Card title="工作经历" bordered={false} style={{ marginTop: '24px' }}>
        {experience.length > 0 ? (
          experience.map((exp) => (
            <Descriptions key={exp.experience_id} bordered style={{ marginBottom: '16px' }}>
              <Descriptions.Item label="公司">{exp.company_name}</Descriptions.Item>
              <Descriptions.Item label="职位">{exp.position}</Descriptions.Item>
              <Descriptions.Item label="入职日期">{exp.start_date}</Descriptions.Item>
              <Descriptions.Item label="离职日期">{exp.end_date}</Descriptions.Item>
            </Descriptions>
          ))
        ) : (
          <Text>无工作经历</Text>
        )}
      </Card>
    </div>
  );
};

export default PersonDetail;
