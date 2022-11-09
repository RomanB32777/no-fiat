import { ChartOptions } from "chart.js";
import moment from "moment";
import {
  IFilterPeriodItems,
  periodItemsTypes,
} from "../../../../utils/dateMethods/types";

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
      display: false,
    },

    tooltip: {
      callbacks: {
        label: ({ formattedValue }) => formattedValue + " USD",
      },
    },
  },
};

type periodFormatTypes = "HH:mm" | "DD/MM" | "DD/MM/YYYY" | "MMMM";

export const dateFormat: IFilterPeriodItems<periodFormatTypes> = {
  "0_day": "HH:mm",
  "7_day": "DD/MM",
  "30_day": "DD/MM/YYYY",
  "1_year": "MMMM",
};

type periodEnumerateTypes = "hours" | "days" | "months";

export const periodTypes: IFilterPeriodItems<periodEnumerateTypes> = {
  "0_day": "hours",
  "7_day": "days",
  "30_day": "days",
  "1_year": "months",
};
interface IEnumerateDates {
  startDate: number;
  endDate: number;
  timePeriod: periodItemsTypes;
}

export const enumerateBetweenDates = ({
  startDate,
  endDate,
  timePeriod,
}: IEnumerateDates) => {
  let dates = [];
  for (
    let m = moment(startDate).add(1, periodTypes[timePeriod]);
    m.isBefore(endDate);
    m.add(1, periodTypes[timePeriod])
  ) {
    dates.push(m.format(dateFormat[timePeriod]));
  }
  return dates;
};
