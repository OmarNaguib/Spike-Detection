import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const AlgorithmTabs = ({ algorithms, onSelect }) => {
  return (
    <Tabs defaultActiveKey="0" onChange={onSelect}>
      {algorithms.map((algo, index) => (
        <TabPane tab={algo.name} key={index}>
          {algo.description}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default AlgorithmTabs;
