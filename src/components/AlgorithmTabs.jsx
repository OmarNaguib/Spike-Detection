import { Tabs, Card, Typography } from "antd";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

/* eslint-disable react/prop-types */
const AlgorithmTabs = ({ algorithms, onSelect }) => {
  return (
    <Tabs
      defaultActiveKey="0"
      onChange={onSelect}
      type="card"
      size="large"
      className="algorithm-tabs"
      tabBarStyle={{
        marginBottom: "16px",
      }}
      tabBarGutter={8}
    >
      {algorithms.map((algo, index) => (
        <TabPane
          tab={
            <span style={{ padding: "0 8px", fontWeight: 500 }}>
              {algo.name}
            </span>
          }
          key={index}
        >
          <Card
            bordered={false}
            style={{
              background: "#f8fafc",
              borderRadius: "8px",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.04)",
            }}
          >
            <Paragraph style={{ margin: 0, padding: "8px", color: "#475569" }}>
              {algo.description}
            </Paragraph>
          </Card>
        </TabPane>
      ))}
    </Tabs>
  );
};

export default AlgorithmTabs;
