import React from 'react';
import { Drawer, Tabs, Typography, Empty } from 'antd';
import type { TabsProps } from 'antd';
import { goldComparisonData } from '../constants/goldComparisonData';
import type { PackageComparisonData } from '../constants/goldComparisonData';

import OverviewComparison from './OverviewComparison';
import RiskGraphComparison from './RiskGraphComparison';
import DependenciesComparison from './DependenciesComparison';
import VulnerabilityComparison from './VulnerabilityComparison';

const { Title } = Typography;

interface GoldSideSheetProps {
  packageKey: string;
  open: boolean;
  onClose: () => void;
}

const formatTitle = (pkgKey: string) => {
  const parts = pkgKey.split(':');
  if (parts.length === 2) {
    return `${capitalize(parts[1])} (${capitalize(parts[0])})`;
  }
  return capitalize(pkgKey);
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const GoldSideSheet: React.FC<GoldSideSheetProps> = ({ packageKey, open, onClose }) => {
  const data: PackageComparisonData | undefined = goldComparisonData[packageKey];

  // ✅ Add this check right here
  if (!data) {
    return (
      <Drawer
  title={
    <Title level={4} style={{ margin: 0 }}>
      {formatTitle(packageKey)}
    </Title>
  }
  open={open}
  onClose={onClose}
  width="100%"
  destroyOnClose
>

        <Empty description="No data found for this package" />
      </Drawer>
    );
  }

  const hasGoldVersion = !!data.goldVersion;

  const items: TabsProps['items'] = hasGoldVersion
    ? [
        {
          key: 'overview',
          label: 'Overview',
          children: <OverviewComparison data={data} />,
        },
        {
          key: 'risk',
          label: 'Risk Graph',
          children: <RiskGraphComparison data={data} />,
        },
        {
          key: 'dependencies',
          label: 'Dependencies',
          children: <DependenciesComparison data={data} />,
        },
        {
          key: 'vulnerabilities',
          label: 'Vulnerabilities',
          children: <VulnerabilityComparison data={data} />,
        },
      ]
    : [];

  return (
    <Drawer
      title={<Title level={4}>{packageKey} Details</Title>}
      open={open}
      onClose={onClose}
      width="100%"
      bodyStyle={{ padding: 24 }}
      destroyOnClose
    >
      {hasGoldVersion ? (
        <Tabs defaultActiveKey="overview" items={items} />
      ) : (
        <Empty description="No Gold Version Available" />
      )}
    </Drawer>
  );
};

export default GoldSideSheet;
