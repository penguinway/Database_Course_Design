import React from 'react';
import { Card, Typography, Space, Button, Layout } from 'antd';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Card title="关于船舶人力资源管理系统" bordered={false}>
        <Title level={2}>船舶人力资源管理系统</Title>
        <Paragraph>
          本系统旨在为船舶公司提供一站式的员工管理解决方案，涵盖员工信息管理、教育经历管理、岗位信息管理等功能，帮助企业高效管理船员和其他员工资源。
        </Paragraph>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Card type="inner" title="版本信息" bordered={false}>
            <Paragraph>
              当前版本: <strong>v1.0.0</strong>
            </Paragraph>
            <Paragraph>
              发布日期: <strong>2024-12-17</strong>
            </Paragraph>
          </Card>

          <Card type="inner" title="开发团队" bordered={false}>
            <Paragraph>
              本项目由以下团队成员开发：
              <ul>
                <li>叶桐 - 前后端开发</li>
              </ul>
            </Paragraph>
          </Card>

          <Card type="inner" title="联系方式" bordered={false}>
            <Paragraph>
              <Button
                type="link"
                icon={<MailOutlined />}
                onClick={() => window.location.href = 'mailto:penguinway@hrbeu.edu.cn'}
              >
                发送邮件
              </Button>
              <Button
                type="link"
                icon={<GithubOutlined />}
                onClick={() => window.location.href = 'https://github.com/penguinway/Database_Course_Design'}
              >
                查看代码
              </Button>
            </Paragraph>
          </Card>
        </Space>
      </Card>
    </Layout>
  );
};

export default AboutPage;
