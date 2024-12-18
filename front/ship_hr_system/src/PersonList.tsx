import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios'; // 引入 axios

interface Person {
  employee_id: number;
  Creation_date: string | null;
  name: string;
  date_of_birth: string;
  gender: string;
  age: number;
  ID_number: string;
  Contact: string;
  email: string;
}

const PersonList: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 使用 axios 获取人员列表
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/persons/');
        setPersons(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('加载人员列表失败');
      } finally {
        setLoading(false);
      }
    };
    fetchPersons();
  }, []);

  // 格式化日期
  const formatDate = (date: string | null) => {
    return date ? new Date(date).toLocaleDateString() : '未提供';
  };

  // 表格的列配置
  const columns = [
    {
      title: '员工ID',
      dataIndex: 'employee_id',
      key: 'employee_id',
    },
    {
      title: '入职日期',
      dataIndex: 'Creation_date',
      key: 'Creation_date',
      render: (text: string | null) => formatDate(text),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Person) => (
        <Space size="middle">
          <Button type="primary">
            <Link to={`/employee-management/edit-employee/${record.employee_id}`}>编辑</Link>
          </Button>
        </Space>
      ),
    },
    {
        title: '详情',
        key: 'detail',
        render: (_: any, record: Person) => (
          <Space size="middle">
            <Button type="primary">
              <Link to={`/employee-management/employee-detail/${record.employee_id}`}>详情</Link>
            </Button>
          </Space>
        ),
      },
  ];

  if (error) {
    return (
      <Result
        status="error"
        title={error}
        subTitle="加载数据失败，请联系管理员处理"
      />
    );
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>人员列表</h1>
      <Table
        loading={loading}
        columns={columns}
        dataSource={persons}
        rowKey="employee_id"
        pagination={false} // 可以根据需要添加分页
      />
    </div>
  );
};

export default PersonList;
