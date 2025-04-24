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
      size="small"
      className="algorithm-tabs"
      tabBarStyle={{
        marginBottom: "12px",
      }}
      tabBarGutter={4}
    >
      {algorithms.map((algo, index) => (
        <TabPane
          tab={
            <span
              style={{ padding: "0 4px", fontWeight: 500, fontSize: "13px" }}
            >
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
              padding: "8px",
            }}
          >
            <Paragraph
              style={{
                margin: 0,
                padding: "4px",
                color: "#475569",
                fontSize: "13px",
              }}
            >
              {algo.description}
            </Paragraph>
          </Card>
        </TabPane>
      ))}
    </Tabs>
  );
};

export default AlgorithmTabs;
