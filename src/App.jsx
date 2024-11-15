import React, { useState } from "react";
import { Layout, Select, Slider, Tabs } from "antd";
import Chart from "./components/Chart";
import AlgorithmTabs from "./components/AlgorithmTabs";
import { algorithms } from "./algorithms";
import { dataSeries } from "./dataSeries";

const { Header, Content } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;

const App = () => {
  const [selectedSeries, setSelectedSeries] = useState(dataSeries[0].data);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
  const [threshold, setThreshold] = useState(0.2);
  const [criteria, setCriteria] = useState("absolute");
  const [spikes, setSpikes] = useState([]);

  const handleAlgorithmSelect = (key) => {
    const algorithm = algorithms[key];
    setSelectedAlgorithm(key);
    setSpikes(algorithm.detect(selectedSeries, threshold, criteria));
  };

  const handleSeriesChange = (value) => {
    const series = dataSeries.find((series) => series.name === value);
    setSelectedSeries(series.data);
    setSpikes(
      algorithms[selectedAlgorithm].detect(series.data, threshold, criteria)
    );
  };

  const handleThresholdChange = (value) => {
    setThreshold(value);
    setSpikes(
      algorithms[selectedAlgorithm].detect(selectedSeries, value, criteria)
    );
  };

  const handleCriteriaChange = (key) => {
    setCriteria(key);
    setSpikes(
      algorithms[selectedAlgorithm].detect(selectedSeries, threshold, key)
    );
  };

  return (
    <Layout>
      <Header style={{ background: "none" }}>
        <h1>Spike Detection Demo</h1>
      </Header>
      <Content style={{ padding: "20px" }}>
        <Select
          defaultValue={dataSeries[0].name}
          style={{ width: 200, marginBottom: "20px" }}
          onChange={handleSeriesChange}
        >
          {dataSeries.map((series) => (
            <Option key={series.name} value={series.name}>
              {series.name}
            </Option>
          ))}
        </Select>
        <AlgorithmTabs
          algorithms={algorithms}
          onSelect={handleAlgorithmSelect}
        />
        {(selectedAlgorithm == 0 || selectedAlgorithm == 3) && (
          <div style={{ marginBottom: "20px" }}>
            <span>Threshold: {threshold}</span>
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={threshold}
              onChange={handleThresholdChange}
              style={{ width: 200 }}
            />
          </div>
        )}
        {selectedAlgorithm == 4 && (
          <Tabs defaultActiveKey="delta" onChange={handleCriteriaChange}>
            <TabPane tab="Delta" key="delta">
              Highest based on delta value
            </TabPane>
            <TabPane tab="Absolute" key="absolute">
              Highest based on absolute value
            </TabPane>
            <TabPane tab="Delta to Previous Min" key="deltaPrev">
              Highest based on delta to the previous local minimum
            </TabPane>
            <TabPane tab="Sum of Deltas" key="deltaSum">
              Highest based on the sum of delta to previous and next local
              minima
            </TabPane>
          </Tabs>
        )}
        <Chart data={selectedSeries} spikes={spikes} />
      </Content>
    </Layout>
  );
};

export default App;
