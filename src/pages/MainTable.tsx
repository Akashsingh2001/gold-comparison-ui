import React, { useState } from 'react';
import { Table, Button, Input, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import GoldSideSheet from '../components/GoldSideSheet';

const { Title } = Typography;

const dataSource = [
  {
    packageKey: 'npmcli:fs',
    name: 'npmcli/fs',
    version: '2.5.2',
    description: 'File system helpers for npmcli',
  },
  {
    packageKey: 'apache:log4j',
    name: 'Apache Log4j',
    version: '1.2.17',
    description: 'Java logging library',
  },
  {
    packageKey: 'express:core',
    name: 'Express Core',
    version: '4.18.2',
    description: 'Web framework for Node.js',
  },
  {
    packageKey: 'react:core',
    name: 'React Core',
    version: '18.2.0',
    description: 'Frontend library for building UIs',
  },
  {
    packageKey: 'lodash:utils',
    name: 'Lodash Utils',
    version: '4.17.21',
    description: 'Utility functions for JavaScript',
  },
  {
    packageKey: 'axios:http',
    name: 'Axios HTTP',
    version: '1.6.2',
    description: 'Promise-based HTTP client',
  },
  {
    packageKey: 'pandas:data',
    name: 'Pandas (Python)',
    version: '2.0.3',
    description: 'Data analysis library for Python',
  }
];

const MainTable: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleView = (key: string) => {
    setSelectedPackage(key);
    setOpenDrawer(true);
  };

  const columns = [
    {
      title: 'Package',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button onClick={() => handleView(record.packageKey)}>View Details</Button>
      ),
    },
  ];

  const filteredData = dataSource.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <Space
  style={{
    width: '100%',
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}
>
  <Title level={4} style={{ margin: 0 }}>
    📦 Package Comparison Table
  </Title>
  <Input
    placeholder="Search packages..."
    prefix={<SearchOutlined />}
    allowClear
    onChange={(e) => setSearchText(e.target.value)}
    style={{ width: 250 }}
  />
</Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="packageKey"
        bordered
        size="middle"
        style={{ width: '100%', marginTop: 16 }}
      />
      {selectedPackage && (
        <GoldSideSheet
          packageKey={selectedPackage}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        />
      )}
    </div>
  );
};

export default MainTable;
