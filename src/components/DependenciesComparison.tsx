import React from 'react';
import { Row, Col, Table, Tag, Typography } from 'antd';

const { Title } = Typography;

interface DependenciesComparisonProps {
  data: any;
}

const DependenciesComparison: React.FC<DependenciesComparisonProps> = ({ data }) => {
  const { baseVersion, goldVersion, dependencies } = data;

  const columns = [
    {
      title: 'Dependency',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        if (status === 'safe') {
          return <Tag color="green">Verified</Tag>;
        }
        return <Tag color="red">Warning</Tag>;
      },
    },
  ];

  return (
    <Row gutter={32}>
      {/* Base Dependencies */}
      <Col span={12}>
        <Title level={5}>Base Version: {baseVersion}</Title>
        <Table
          columns={columns}
          dataSource={dependencies.base}
          size="small"
          pagination={false}
          rowKey="name"
        />
      </Col>

      {/* Gold Dependencies */}
      <Col span={12}>
        <Title level={5}>Gold Version: {goldVersion}</Title>
        <Table
          columns={columns}
          dataSource={dependencies.gold}
          size="small"
          pagination={false}
          rowKey="name"
        />
      </Col>
    </Row>
  );
};

export default DependenciesComparison;
