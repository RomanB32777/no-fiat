import { ChartOptions } from "chart.js";
import { periodItemsTypes } from "../../../../utils/dateMethods/types";

export const options: ChartOptions<"line"> = {
  scales: {
    y: {
      beginAtZero: true,

      ticks: {
        color: "rgb(255, 255, 255)",
        callback: (value) => value + " USD",
      },
      grid: {
        color: "#353535",
      },
    },
    x: {
      ticks: {
        color: "rgb(255, 255, 255)",
      },
      grid: {
        color: "#353535",
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "rgb(255, 255, 255)",
      },
      onClick: (e, legendItem, legend) => null,
    },

    tooltip: {
      callbacks: {
        label: ({ formattedValue }) => formattedValue + " USD",
      },
    },
  },
};

export const dateFormat: { [key in periodItemsTypes]: string } = {
  "0_day": "HH:mm",
  "7_day": "dddd",
  "30_day": "DD/MM/YYYY",
  "1_year": "MMMM",
};
