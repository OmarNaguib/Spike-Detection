// src/components/Chart.jsx
/* eslint-disable react/prop-types */
import ReactEcharts from "echarts-for-react";

const formatNumber = (num, notation = "compact", locale = "en") => {
  const formatter = Intl.NumberFormat(locale, { notation: notation });
  return formatter.format(num);
};

const Chart = ({ data, spikes }) => {
  const option = {
    grid: {
      left: "5%",
      right: "5%",
      top: "8%",
      bottom: "8%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const dataIndex = params[0].dataIndex;
        const value = params[0].value;
        const isSpike = spikes.includes(dataIndex);

        return `
          <div style="font-weight: bold; margin-bottom: 4px;">
            Point: ${dataIndex}
          </div>
          <div>
            Value: ${formatNumber(value, "standard")}
            ${
              isSpike
                ? '<span style="color:#e74c3c;font-weight:bold;"> (Spike)</span>'
                : ""
            }
          </div>
        `;
      },
    },
    xAxis: {
      type: "category",
      data: data.map((_, index) => index),
      axisLine: {
        lineStyle: {
          color: "#cbd5e1",
        },
      },
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        color: "#64748b",
        formatter: (value) => formatNumber(value),
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "#64748b",
        formatter: (value) => formatNumber(value),
      },
      splitLine: {
        lineStyle: {
          color: "#f1f5f9",
          type: "dashed",
        },
      },
    },
    series: [
      {
        data: data,
        type: "line",
        smooth: true,
        symbol: "emptyCircle",
        symbolSize: 6,
        lineStyle: {
          width: 3,
          color: "#3498db",
          shadowColor: "rgba(52, 152, 219, 0.3)",
          shadowBlur: 10,
        },
        itemStyle: {
          color: "#3498db",
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(52, 152, 219, 0.4)",
              },
              {
                offset: 1,
                color: "rgba(52, 152, 219, 0.1)",
              },
            ],
          },
        },
        markPoint: {
          symbol: "pin",
          symbolSize: 40,
          itemStyle: {
            color: "#e74c3c",
          },
          data: spikes.map((index) => ({
            xAxis: index,
            yAxis: data[index],
            name: "Spike",
            value: formatNumber(data[index]),
          })),
          label: {
            formatter: () => {
              return "";
            },
          },
          emphasis: {
            itemStyle: {
              color: "#c0392b",
            },
          },
        },
        // markLine: {
        //   silent: true,
        //   lineStyle: {
        //     color: "#e74c3c",
        //     type: "dashed",
        //     opacity: 0.5,
        //   },
        //   data: spikes.map((index) => ({
        //     xAxis: index,
        //     label: {
        //       show: false,
        //     },
        //   })),
        // },
      },
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: "elasticOut",
  };

  return (
    <ReactEcharts
      option={option}
      style={{ height: "100%", width: "100%" }}
      className="chart-container"
    />
  );
};

export default Chart;
