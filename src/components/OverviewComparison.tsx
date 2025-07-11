import React from 'react';
import { Row, Col, Typography, List, Tag, Table, Empty } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const { Title } = Typography;

interface OverviewProps {
  data: any;
}

const OverviewComparison: React.FC<OverviewProps> = ({ data }) => {
  const { baseVersion, goldVersion, overview } = data;

  const checklistItems = [
    "Supplier and License",
    "Well maintained & Supported",
    "Malware",
    "Secrets",
  ];

  const usageTableColumns = [
    { title: 'Project', dataIndex: 'name', key: 'name' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Organization', dataIndex: 'org', key: 'org' },
    { title: 'Product', dataIndex: 'product', key: 'product' },
  ];

  return (
    <Row gutter={32}>
      {/* Left Side - Base Version */}
      <Col span={12}>
        <Title level={5}>Base Version: {baseVersion}</Title>
        <List
          size="small"
          dataSource={checklistItems}
          renderItem={(item) => (
            <List.Item>
              <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ marginRight: 8 }} />
              {item}
            </List.Item>
          )}
        />
        <div style={{ margin: '16px 0' }}>
          <Tag color="volcano">3 Organizations</Tag>
          <Tag color="gold">5 Products</Tag>
          <Tag color="blue">7 Projects</Tag>
        </div>
        <Table
          columns={usageTableColumns}
          dataSource={overview.usage}
          size="small"
          pagination={false}
          rowKey="name"
        />
      </Col>

      {/* Right Side - Gold Version */}
      <Col span={12}>
        <Title level={5}>Gold Version: {goldVersion}</Title>
        <List
          size="small"
          dataSource={checklistItems}
          renderItem={(item) => (
            <List.Item>
              <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8 }} />
              {item}
            </List.Item>
          )}
        />
        <div style={{ marginTop: 32 }}>
          <Empty description="⚠ Not being used" />
        </div>
      </Col>
    </Row>
  );
};

export default OverviewComparison;
