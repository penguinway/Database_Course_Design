import React, { useEffect, useState } from 'react';
import { Select, Button, Descriptions, message, Result } from 'antd';
import axios from 'axios';

const { Option } = Select;

const PersonPosition: React.FC = () => {
  const [operation, setOperation] = useState<string | null>(null); // 分配或解除
  const [persons, setPersons] = useState<any[]>([]); // 所有人员列表
  const [positions, setPositions] = useState<any[]>([]); // 所有岗位列表
  const [currentPersonPositions, setCurrentPersonPositions] = useState<any[]>([]); // 当前人员的岗位
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null); // 选择的人员
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null); // 选择的岗位
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 获取所有人员和岗位
    const fetchPersonsAndPositions = async () => {
      try {
        const personsResponse = await axios.get('http://localhost:8000/api/persons/');
        const positionsResponse = await axios.get('http://localhost:8000/api/positions/');
        setPersons(personsResponse.data);
        setPositions(positionsResponse.data);
      } catch (error) {
        message.error('无法加载人员或岗位信息');
        setError('无法加载人员或岗位信息');
      }
    };
    fetchPersonsAndPositions();
  }, []);

  useEffect(() => {
    // 当选择了人员时，获取该人员的岗位
    const fetchPersonPositions = async () => {
      if (selectedPerson) {
        try {
          const response = await axios.get(`http://localhost:8000/api/persons/detail/?person_id=${selectedPerson}`);
          console.log(response.data.position);
          setCurrentPersonPositions(response.data.position);
        } catch (error) {
          message.error('无法加载该人员的岗位信息');
          setError('无法加载该人员的岗位信息');
        }
      } else {
        setCurrentPersonPositions([]);
      }
    };
    fetchPersonPositions();
  }, [selectedPerson]);

  const handleSubmit = async () => {
    if (!selectedPerson || !selectedPosition) {
      message.error('请完整选择人员和岗位');
      return;
    }
    try {
        await axios.post('http://localhost:8000/api/persons/positions/change/', {
            action: operation,
            employee_id: selectedPerson,
            position_id: selectedPosition,
        });
        if (operation === 'add') {
            message.success('岗位分配成功');
        } else {
            message.success('岗位解除成功');
        }
    } catch (error) {
      message.error(`操作失败, ${error}`);
      setError('操作失败');
    } finally {
      setSuccess(true);
    }
  };

  if (success && !error) {
    return (
      <div>
        <Result
        status="success"
        title={success ? "执行成功" : "执行失败"}
        subTitle="您已成功执行了操作"
        />
      </div>
    );
  }

  return (
    <div>
      <h2>人员岗位管理</h2>

      {/* 操作选择 */}
      <Select
        placeholder="请选择操作"
        onChange={(value) => {
          setOperation(value);
          setSelectedPerson(null);
          setSelectedPosition(null);
          setCurrentPersonPositions([]);
        }}
        style={{ width: 200, marginBottom: 20 }}
      >
        <Option value="add">分配</Option>
        <Option value="remove">解除</Option>
      </Select>

      {operation && (
        <>
          {/* 人员选择 */}
          <Select
            placeholder="请选择人员"
            onChange={(value) => setSelectedPerson(value)}
            style={{ width: 200, margin: '0 20px' }}
          >
            {persons.map((person) => (
              <Option key={person.employee_id} value={person.employee_id}>
                {person.name}
              </Option>
            ))}
          </Select>

          {/* 岗位选择 */}
          {operation === 'add' ? (
            <Select
              placeholder="请选择岗位"
              onChange={(value) => setSelectedPosition(value)}
              style={{ width: 200 }}
            >
              {positions.map((position) => (
                <Option key={position.position_id} value={position.position_id}>
                  {position.name}
                </Option>
              ))}
            </Select>
          ) : (
            <Select
              placeholder="请选择岗位"
              onChange={(value) => setSelectedPosition(value)}
              style={{ width: 200 }}
            >
              {currentPersonPositions.map((positionId) => {
                const position = positions.find((pos) => pos.position_id === positionId);
                return (
                  <Option key={position?.position_id} value={position?.position_id}>
                    {position?.name}
                  </Option>
                );
              })}
            </Select>
          )}

          <Button type="primary" onClick={handleSubmit} style={{ marginLeft: 20 }}>
            {operation === 'add' ? '分配' : '解除'}
          </Button>
        </>
      )}

      {/* 显示选定信息 */}
      {selectedPerson && (
        <Descriptions title="人员信息" bordered style={{ marginTop: 20 }}>
          {persons
            .filter((person) => person.employee_id === selectedPerson)
            .map((person) => (
              <>
                <Descriptions.Item label="姓名">{person.name}</Descriptions.Item>
                <Descriptions.Item label="性别">{person.gender}</Descriptions.Item>
                <Descriptions.Item label="年龄">{person.age}</Descriptions.Item>
                <Descriptions.Item label="邮箱">{person.email}</Descriptions.Item>
                <Descriptions.Item label="联系方式">{person.Contact}</Descriptions.Item>
                <Descriptions.Item label="身份证号">{person.ID_number}</Descriptions.Item>
              </>
            ))}
        </Descriptions>
      )}

      {selectedPosition && (
        <Descriptions title="岗位信息" bordered style={{ marginTop: 20 }}>
          {positions
            .filter((position) => position.position_id === selectedPosition)
            .map((position) => (
              <>
                <Descriptions.Item label="岗位名称">{position.name}</Descriptions.Item>
                <Descriptions.Item label="职责">{position.responsibilities || '暂无'}</Descriptions.Item>
                <Descriptions.Item label="描述">{position.description || '暂无'}</Descriptions.Item>
              </>
            ))}
        </Descriptions>
      )}
    </div>
  );
};

export default PersonPosition;
