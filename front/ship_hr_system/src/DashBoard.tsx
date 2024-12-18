import React, { useEffect, useState } from 'react';
import { Layout, Typography, Button, Row, Col, Image } from 'antd';
import { Pie, Column } from '@ant-design/plots'; // 引入 Ant Design Charts
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;
const { Content } = Layout;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [personCount, setPersonCount] = useState<number>(0); // 人数统计
  const [positionData, setPositionData] = useState<any[]>([]); // 岗位统计

  useEffect(() => {
    // 获取员工人数和岗位数据
    const fetchData = async () => {
      try {
        const personsResponse = await axios.get('http://localhost:8000/api/persons/');
        const positionsResponse = await axios.get('http://localhost:8000/api/positions/');
        setPersonCount(personsResponse.data.length); // 总人数
        const positionsCount = positionsResponse.data.map((position: any) => ({
          type: position.name,
          value: personsResponse.data.filter((person: any) => person.position.includes(position.position_id)).length,
        }));
        setPositionData(positionsCount);
      } catch (error) {
        console.error('无法加载数据', error);
      }
    };
    fetchData();
  }, []);

  const handlePersonPage = () => {
    navigate('/employee-management/all-employees'); // 跳转到员工管理页面
  };

  // 饼图配置（岗位分布）
  const pieConfig = {
    appendPadding: 10,
    data: positionData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{value}',
      style: { textAlign: 'center', fontSize: 14 },
    },
    interactions: [{ type: 'element-active' }],
  };

  // 柱状图配置（员工与岗位对比）
  const columnConfig = {
    data: [
      { type: '员工总数', value: personCount },
      { type: '岗位总数', value: positionData.length },
    ],
    xField: 'type',
    yField: 'value',
    colorField: 'type',
    columnWidthRatio: 0.5,
    label: {
      position: 'middle',
      style: { fill: '#FFFFFF', opacity: 0.6 },
    },
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',
          }}
        >
          <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col span={12} style={{ textAlign: 'center' }}>
            <Image src="https://image.penguinway.space/i/2024/06/15/666d97e35f08f.png" preview={false} width={200} />
              <Title level={2}>欢迎使用船舶人力资源管理系统</Title>
              <p>系统提供员工管理、岗位管理、信息管理等功能，帮助您更好地管理船舶人员。</p>
              <Button type="primary" size="large" onClick={handlePersonPage}>
                开始使用
              </Button>
            </Col>
          </Row>

          <Row gutter={24} style={{ marginTop: 40 }}>
            <Col span={12}>
              <Title level={4} style={{ textAlign: 'center' }}>
                岗位分布
              </Title>
              <Pie {...pieConfig} />
            </Col>
            <Col span={12}>
              <Title level={4} style={{ textAlign: 'center' }}>
                员工与岗位统计
              </Title>
              <Column {...columnConfig} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
