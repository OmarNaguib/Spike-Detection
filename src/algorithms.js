export const algorithms = [
  {
    name: "Delta/Max",
    description: "Detects spikes based on delta/max criteria.",
    detect: ({ data, primaryThreshold = 0.2 }) => {
      const max = Math.max(...data);
      const thresholdValue = primaryThreshold * max;
      return data.reduce((spikes, point, index) => {
        if (index > 0 && point - data[index - 1] > thresholdValue) {
          spikes.push(index);
        }
        return spikes;
      }, []);
    },
  },
  {
    name: "Local Maxima",
    description:
      "Detects all local maxima, including the global maximum if it is the first or last point.",
    detect: ({ data }) => {
      const spikes = data.reduce((spikes, point, index) => {
        if (
          index > 0 &&
          index < data.length - 1 &&
          point > data[index - 1] &&
          point > data[index + 1]
        ) {
          spikes.push(index);
        }
        return spikes;
      }, []);

      // Check the first point
      if (data.length > 1 && data[0] > data[1]) {
        spikes.push(0);
      }

      // Check the last point
      if (data.length > 1 && data[data.length - 1] > data[data.length - 2]) {
        spikes.push(data.length - 1);
      }

      return spikes;
    },
  },
  {
    name: "Global Maximum",
    description: "Detects the global maximum.",
    detect: ({ data }) => {
      const maxIndex = data.indexOf(Math.max(...data));
      return [maxIndex];
    },
  },
  {
    name: "Delta with Look Forward",
    description:
      "Detects spikes based on delta/max criteria and looks for the peak that follows the point of significant change.",
    detect: ({ data, primaryThreshold = 0.2 }) => {
      const max = Math.max(...data);
      const thresholdValue = primaryThreshold * max;
      const spikes = [];
      for (let i = 0; i < data.length - 1; i++) {
        if (data[i + 1] - data[i] > thresholdValue) {
          let peakIndex = i + 1;
          for (let j = i + 2; j < data.length; j++) {
            if (data[j] > data[peakIndex]) {
              peakIndex = j;
            } else {
              break;
            }
          }
          spikes.push(peakIndex);
          i = peakIndex;
        }
      }
      return spikes;
    },
  },
  {
    name: "Percentage of Local Maxima",
    description:
      "Marks a maximum number of local maxima based on percentage criteria.",
    detect: ({ data, criteria = "delta" }) => {
      // Find the minimum value in the data
      const dataMin = Math.min(...data);

      // Pad the array with the minimum value at both ends
      const paddedData = [dataMin, ...data, dataMin];

      const localMaxima = [];
      const localMinima = [];

      // Find local minima and maxima
      for (let i = 1; i < paddedData.length - 1; i++) {
        if (
          paddedData[i] < paddedData[i - 1] &&
          paddedData[i] < paddedData[i + 1]
        ) {
          localMinima.push(i - 1); // Adjust index to account for padding
        }
        if (
          paddedData[i] > paddedData[i - 1] &&
          paddedData[i] > paddedData[i + 1]
        ) {
          localMaxima.push(i - 1); // Adjust index to account for padding
        }
      }

      const maxCount = Math.ceil((data.length / 40) * 6);
      const scoredMaxima = localMaxima.map((index) => {
        // Find the last local minimum before the current local maximum
        const prevMinIndex = localMinima
          .filter((minIndex) => minIndex < index)
          .pop();
        const prevMin =
          prevMinIndex !== undefined ? paddedData[prevMinIndex + 1] : dataMin;

        // Find the next local minimum after the current local maximum
        const nextMinIndex = localMinima.find((minIndex) => minIndex > index);
        const nextMin =
          nextMinIndex !== undefined ? paddedData[nextMinIndex + 1] : dataMin;

        const deltaPrev = paddedData[index + 1] - prevMin;
        const deltaNext = paddedData[index + 1] - nextMin;
        let score;
        console.log("criteria", criteria);
        switch (criteria) {
          case "delta":
            score = paddedData[index + 1] - paddedData[index];
            break;
          case "absolute":
            score = paddedData[index + 1];
            break;
          case "deltaPrev":
            score = deltaPrev;
            break;
          case "deltaSum":
            score = deltaPrev + deltaNext;
            break;
          default:
            score = paddedData[index + 1] - paddedData[index];
        }

        return { index, score };
      });

      scoredMaxima.sort((a, b) => b.score - a.score);
      return scoredMaxima.slice(0, maxCount).map((max) => max.index);
    },
  },
  {
    name: "⭐ Delta Forward with Dual Thresholds",
    description:
      "Detects spikes based on two delta/max criteria and uses a fallback if the first primaryThreshold detects less than a specified percentage of spikes.",
    detect: ({
      data,
      primaryThreshold = 0.2,
      secondaryThreshold = 0.1,
      minPercentage = 0.2,
    }) => {
      const max = Math.max(...data);
      const primaryThresholdValue = primaryThreshold * max;
      const secondaryThresholdValue = secondaryThreshold * max;
      const minSpikesCount = Math.ceil(data.length * minPercentage);
      let spikes = [];

      for (let i = 0; i < data.length - 1; i++) {
        if (data[i + 1] - data[i] > primaryThresholdValue) {
          let peakIndex = i + 1;
          for (let j = i + 2; j < data.length; j++) {
            if (data[j] > data[peakIndex]) {
              peakIndex = j;
            } else {
              break;
            }
          }
          spikes.push(peakIndex);
          i = peakIndex;
        }
      }

      if (spikes.length < minSpikesCount) {
        spikes = [];
        const potentialSpikes = [];
        for (let i = 0; i < data.length - 1; i++) {
          if (data[i + 1] - data[i] > secondaryThresholdValue) {
            let peakIndex = i + 1;
            for (let j = i + 2; j < data.length; j++) {
              if (data[j] > data[peakIndex]) {
                peakIndex = j;
              } else {
                break;
              }
            }
            potentialSpikes.push(peakIndex);
            i = peakIndex;
          }
        }
        potentialSpikes.sort((a, b) => data[b] - data[a]);
        spikes = potentialSpikes.slice(0, minSpikesCount);
      }

      return spikes;
    },
  },
];
