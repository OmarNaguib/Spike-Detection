import React, { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";

const Chart = ({ data, spikes }) => {
  const [options, setOptions] = useState({});
  const prevSpikesRef = useRef([]);

  useEffect(() => {
    const prevSpikes = prevSpikesRef.current;
    const spikesChanged = JSON.stringify(prevSpikes) !== JSON.stringify(spikes);

    if (spikesChanged) {
      setOptions({
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
      });

      // Update the previous spikes reference
      prevSpikesRef.current = spikes;
    }
  }, [data, spikes]);

  return <ReactECharts option={options} />;
};

export default Chart;
