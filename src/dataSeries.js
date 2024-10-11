// src/dataSeries.js
export const dataSeries = [
  {
    name: "Series 1",
    data: [2656697, 4960819, 1381008, 4096681, 2834684],
  },
  {
    name: "Series 2",
    data: [
      939850, 977099, 17815, 297673, 424260, 1817771, 836202, 1084264, 1175235,
      25511, 12463, 9373, 442936, 380899, 366231, 155691, 20158, 7541, 7552,
      81659, 255181, 17717, 11537, 766321, 2331603, 632663, 2745047, 27645,
      43776, 10828, 7388,
    ],
  },
  {
    name: "Series 3",
    data: [2583862, 4884794, 1219716, 4022330, 2759985],
  },
  {
    name: "Series 4",
    data: [2583862, 4884794, 1219716, 4022330, 2759985].map(
      (value) => value / 10000
    ),
  },
  {
    name: "Series 5",
    data: (() => {
      const length = 40;
      const series = Array.from({ length }, (_, i) => {
        const base = i * 100000; // Linear upward trend
        const fluctuation = Math.sin(i) * 500000; // Sine wave fluctuation
        return base + fluctuation + Math.random() * 1000000; // Random noise
      });
      series[length - 1] = Math.max(...series) + 1000000; // Ensure the last point is the highest
      return series;
    })(),
  },
];
