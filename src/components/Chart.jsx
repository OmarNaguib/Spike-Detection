// src/components/Chart.jsx
/* eslint-disable react/prop-types */
import ReactEcharts from "echarts-for-react";

const Chart = ({ data, spikes }) => {
  const option = {
    xAxis: {
      type: "category",
      data: data.map((_, index) => index),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data,
        type: "line",
        markPoint: {
          data: spikes.map((index) => ({
            xAxis: index,
            yAxis: data[index],
            name: "Spike",
          })),
        },
      },
    ],
  };

  return <ReactEcharts option={option} />;
};

export default Chart;
