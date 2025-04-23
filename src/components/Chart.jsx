// src/components/Chart.jsx
/* eslint-disable react/prop-types */
import ReactEcharts from "echarts-for-react";

const formatNumber = (num, notation, locale = "en") => {
  const formatter = Intl.NumberFormat(locale, { notation: notation });
  return formatter.format(num);
};

const Chart = ({ data, spikes }) => {
  const option = {
    xAxis: {
      type: "category",
      data: data.map((_, index) => index),
    },
    yAxis: {
      type: "value",
    },
    // label: { show: true },
    series: [
      {
        data: data,
        // smooth: true,
        type: "line",
        markPoint: {
          data: spikes.map((index) => ({
            xAxis: index,
            yAxis: data[index],
            name: "Spike",
          })),
        },
        // label: {
        //   show: true,
        //   formatter: function (params) {
        //     return formatNumber(params.value, "compact", "en");
        //   },
        //   padding: 10,
        //   fontSize: 14,
        //   lineHeight: 19,
        //   distance: 20,
        //   borderWidth: 1,
        //   borderType: "solid",
        //   position: "bottom",
        //   formatter: "{c}",
        // },
      },
    ],
  };

  return <ReactEcharts option={option} />;
};

export default Chart;
