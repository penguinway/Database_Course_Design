import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Result, message, Modal, Typography } from 'antd';
import axios from 'axios'; // 引入 axios
import { Link } from 'react-router-dom';

const { Text } = Typography;

interface Position {
  position_id: number;
  name: string;
  description: string | null;
  responsibilities: string | null;
}

const PositionList: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (position_id: number) => {
    handleDelete(position_id);
    setIsModalOpen(false);
    message.success('删除岗位成功');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (position_id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/positions/delete/?position_id=${position_id}`);
      setPositions(positions.filter((position) => position.position_id !== position_id));
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('删除人员失败');
    }
  };

  // 使用 axios 获取职位列表
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/positions/');
        setPositions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('加载职位列表失败');
      } finally {
        setLoading(false);
      }
    };
    fetchPositions();
  }, []);

  // 表格的列配置
  const columns = [
    {
      title: '职位ID',
      dataIndex: 'position_id',
      key: 'position_id',
    },
    {
      title: '职位名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '职位描述',
      dataIndex: 'description',
      key: 'description',
      render: (text: string | null) => (text ? text : '无描述'),
    },
    {
      title: '职责',
      dataIndex: 'responsibilities',
      key: 'responsibilities',
      render: (text: string | null) => (text ? text : '无职责'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Position) => (
        <Space size="middle">
          <Button type="primary">
            <Link to={`/position-records/edit-position/${record.position_id}`}>编辑</Link>
          </Button>
        </Space>
      ),
    },
    {
      title: '删除',
      key: 'delete',
      render: (_: any, record: Position) => (
        <Space size="middle">
          <Button type="primary" onClick={showModal}>
              删除
            </Button>
            <Modal title="删除确认" open={isModalOpen} onOk={() => handleOk(record.position_id)} onCancel={handleCancel}>
              <Text> 是否确定删除该岗位？ </Text>
            </Modal>
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
      <h1>职位列表</h1>
      <Table
        loading={loading}
        columns={columns}
        dataSource={positions}
        rowKey="position_id"
        pagination={false} // 可以根据需要添加分页
      />
    </div>
  );
};

export default PositionList;
