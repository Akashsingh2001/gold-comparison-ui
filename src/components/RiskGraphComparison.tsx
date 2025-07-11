import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Title, Paragraph } = Typography;

interface RiskGraphProps {
  data: any;
}

const RiskQuadrant: React.FC<{
  label: string;
  color: string;
  showStar: boolean;
}> = ({ label, color, showStar }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        color: '#fff',
        textAlign: 'center',
        padding: '20px 0',
        fontWeight: 600,
        height: 80,
        border: '1px solid #fff',
        position: 'relative',
      }}
    >
      {label}
      {showStar && (
        <span style={{ position: 'absolute', right: 10, top: 10, fontSize: 20 }}>
          ★
        </span>
      )}
    </div>
  );
};

const RiskGraphCard: React.FC<{
  version: string;
  compliance: string;
  tamperability: string;
}> = ({ version, compliance, tamperability }) => {
  const isCompliant = compliance === 'Compliant';
  const isAttested = tamperability === 'Attested';

  const quadrantMatrix = [
    [ // Row 1 = Attested
      { label: 'Attested + Not Compliant', color: '#faad14' },
      { label: 'Attested + Compliant', color: '#52c41a' },
    ],
    [ // Row 2 = Unattested
      { label: 'Unattested + Not Compliant', color: '#ff4d4f' },
      { label: 'Unattested + Compliant', color: '#faad14' },
    ]
  ];

  return (
    <>
      <Title level={5}>Version: {version}</Title>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        {quadrantMatrix.map((row, rowIdx) =>
          row.map((q, colIdx) => {
            const match =
              (rowIdx === 0 && isAttested) || (rowIdx === 1 && !isAttested);
            const star =
              (colIdx === 1 && isCompliant) || (colIdx === 0 && !isCompliant);
            return (
              <RiskQuadrant
                key={q.label}
                label={q.label}
                color={q.color}
                showStar={match && star}
              />
            );
          })
        )}
      </div>
      <Paragraph type="secondary" style={{ marginTop: 12 }}>
        Assessment of the selected package version based on its compliance and
        tamperability.
      </Paragraph>
    </>
  );
};

const RiskGraphComparison: React.FC<RiskGraphProps> = ({ data }) => {
  const { baseVersion, goldVersion, riskGraph } = data;

  return (
    <Row gutter={32}>
      <Col span={12}>
        <RiskGraphCard
          version={baseVersion}
          compliance={riskGraph.base.compliance}
          tamperability={riskGraph.base.tamperability}
        />
      </Col>
      <Col span={12}>
        <RiskGraphCard
          version={goldVersion}
          compliance={riskGraph.gold.compliance}
          tamperability={riskGraph.gold.tamperability}
        />
      </Col>
    </Row>
  );
};

export default RiskGraphComparison;
