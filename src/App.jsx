import { useState } from "react";
import {
  Layout,
  Select,
  Slider,
  Tabs,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Space,
  Tag,
} from "antd";
import Chart from "./components/Chart";
import AlgorithmTabs from "./components/AlgorithmTabs";
import { algorithms } from "./algorithms";
import { dataSeries } from "./dataSeries";
import {
  LineChartOutlined,
  SettingOutlined,
  BulbOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;
const { Title, Text } = Typography;

const App = () => {
  const [selectedSeries, setSelectedSeries] = useState(dataSeries[0].data);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
  const [primaryThreshold, setPrimaryThreshold] = useState(0.2);
  const [secondaryThreshold, setSecondaryThreshold] = useState(0.1);
  const [minPercentage, setMinPercentage] = useState(0.2);
  const [criteria, setCriteria] = useState("absolute");
  const [spikes, setSpikes] = useState([]);

  const handleAlgorithmSelect = (key) => {
    const algorithm = algorithms[key];
    setSelectedAlgorithm(key);
    setSpikes(
      algorithm.detect({
        data: selectedSeries,
        primaryThreshold,
        secondaryThreshold,
        minPercentage,
        criteria,
      })
    );
  };

  const handleSeriesChange = (value) => {
    const series = dataSeries.find((series) => series.name === value);
    setSelectedSeries(series.data);
    setSpikes(
      algorithms[selectedAlgorithm].detect({
        data: series.data,
        primaryThreshold,
        secondaryThreshold,
        minPercentage,
        criteria,
      })
    );
  };

  const handlePrimaryThresholdChange = (value) => {
    setPrimaryThreshold(value);
    setSpikes(
      algorithms[selectedAlgorithm].detect({
        data: selectedSeries,
        primaryThreshold: value,
        secondaryThreshold,
        minPercentage,
        criteria,
      })
    );
  };

  const handleSecondaryThresholdChange = (value) => {
    setSecondaryThreshold(value);
    setSpikes(
      algorithms[selectedAlgorithm].detect({
        data: selectedSeries,
        primaryThreshold,
        secondaryThreshold: value,
        minPercentage,
        criteria,
      })
    );
  };

  const handleMinPercentageChange = (value) => {
    setMinPercentage(value);
    setSpikes(
      algorithms[selectedAlgorithm].detect({
        data: selectedSeries,
        primaryThreshold,
        secondaryThreshold,
        minPercentage: value,
        criteria,
      })
    );
  };

  const handleCriteriaChange = (key) => {
    setCriteria(key);
    setSpikes(
      algorithms[selectedAlgorithm].detect({
        data: selectedSeries,
        primaryThreshold,
        secondaryThreshold,
        minPercentage,
        criteria: key,
      })
    );
  };

  return (
    <Layout
      className="layout"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9fafc 0%, #edf2f7 100%)",
      }}
    >
      <Header
        style={{
          background: "white",
          padding: "0 16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          height: "56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <LineChartOutlined
            style={{ fontSize: "20px", color: "#3498db", marginRight: "8px" }}
          />
          <Title level={4} style={{ margin: 0, color: "#2c3e50" }}>
            Spike Detection <Tag color="#3498db">Demo</Tag>
          </Title>
        </div>
      </Header>

      <Content
        style={{
          padding: "16px",
          width: "100%",
        }}
      >
        <Card className="card" style={{ padding: "12px" }}>
          <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <Title
                  level={5}
                  style={{
                    marginBottom: "8px",
                    fontSize: "15px",
                  }}
                >
                  <SettingOutlined /> Configuration
                </Title>
                <Text strong>Data Series</Text>
                <Select
                  defaultValue={dataSeries[0].name}
                  style={{ width: "100%", marginBottom: "16px" }}
                  onChange={handleSeriesChange}
                >
                  {dataSeries.map((series) => (
                    <Option key={series.name} value={series.name}>
                      {series.name}
                    </Option>
                  ))}
                </Select>

                {(selectedAlgorithm == 3 ||
                  selectedAlgorithm == 4 ||
                  selectedAlgorithm == 5) && (
                  <div style={{ marginBottom: "24px" }}>
                    <Text strong>Primary Threshold: {primaryThreshold}</Text>
                    <Slider
                      min={0}
                      max={1}
                      step={0.01}
                      value={primaryThreshold}
                      onChange={handlePrimaryThresholdChange}
                      style={{ width: "100%" }}
                      trackStyle={{ backgroundColor: "#3498db" }}
                      handleStyle={{
                        borderColor: "#3498db",
                        boxShadow: "0 0 0 2px rgba(52, 152, 219, 0.2)",
                      }}
                    />
                    {selectedAlgorithm == 5 && (
                      <>
                        <Text strong>
                          Secondary Threshold: {secondaryThreshold}
                        </Text>
                        <Slider
                          min={0}
                          max={1}
                          step={0.01}
                          value={secondaryThreshold}
                          onChange={handleSecondaryThresholdChange}
                          style={{ width: "100%" }}
                          trackStyle={{ backgroundColor: "#3498db" }}
                          handleStyle={{
                            borderColor: "#3498db",
                            boxShadow: "0 0 0 2px rgba(52, 152, 219, 0.2)",
                          }}
                        />
                        <Text strong>Minimum Percentage: {minPercentage}</Text>
                        <Slider
                          min={0}
                          max={1}
                          step={0.01}
                          value={minPercentage}
                          onChange={handleMinPercentageChange}
                          style={{ width: "100%" }}
                          trackStyle={{ backgroundColor: "#3498db" }}
                          handleStyle={{
                            borderColor: "#3498db",
                            boxShadow: "0 0 0 2px rgba(52, 152, 219, 0.2)",
                          }}
                        />
                      </>
                    )}
                  </div>
                )}

                {selectedAlgorithm == 2 && (
                  <div style={{ marginBottom: "24px" }}>
                    <Text strong>Criteria Selection</Text>
                    <Tabs
                      defaultActiveKey="deltaSum"
                      onChange={handleCriteriaChange}
                      type="card"
                      size="small"
                      style={{ marginTop: "12px" }}
                    >
                      <TabPane tab="Delta" key="delta">
                        Highest based on delta to previous point
                      </TabPane>
                      <TabPane tab="Absolute" key="absolute">
                        Highest based on absolute value
                      </TabPane>
                      <TabPane tab="Delta to Previous Min" key="deltaPrev">
                        Highest based on delta to the previous local minimum to
                        capture the case of increase over multiple points
                      </TabPane>
                      <TabPane tab="Sum of Deltas" key="deltaSum">
                        Highest based on the sum of delta to previous and next
                        local minima to capture more of the visual aspect
                      </TabPane>
                    </Tabs>
                  </div>
                )}

                <div style={{ marginTop: "24px" }}>
                  <Tag color="#2ecc71">Detected Spikes: {spikes.length}</Tag>
                </div>
              </Space>
            </Col>

            <Col xs={24} sm={24} md={16} lg={18}>
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <Title
                  level={5}
                  style={{
                    marginBottom: "8px",
                    marginTop: "4px",
                    fontSize: "15px",
                  }}
                >
                  <BulbOutlined /> Algorithm Selection
                </Title>
                <AlgorithmTabs
                  algorithms={algorithms}
                  onSelect={handleAlgorithmSelect}
                />

                <Divider style={{ margin: "12px 0" }} />

                <Title
                  level={5}
                  style={{
                    marginBottom: "8px",
                    marginTop: "4px",
                    fontSize: "15px",
                  }}
                >
                  <ThunderboltOutlined /> Visualization
                </Title>
                <div
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    boxShadow: "0 3px 6px rgba(0,0,0,0.06)",
                    padding: "0px",
                    height: "420px",
                  }}
                >
                  <Chart data={selectedSeries} spikes={spikes} />
                </div>
              </Space>
            </Col>
          </Row>
        </Card>
      </Content>

      <Footer
        style={{
          textAlign: "center",
          background: "white",
          padding: "8px",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.03)",
          fontSize: "12px",
        }}
      >
        Spike Detection Demo ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default App;
