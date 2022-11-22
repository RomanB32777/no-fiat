import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import type { ChartData } from "chart.js";
import moment from "moment";
import { periodItemsTypes } from "../../../../utils/dateMethods/types";
import { IEmployee, IFiltersDates } from "../../../../types";
import { dateFormat, enumerateBetweenDates, options } from "./graphData";
import "./styles.sass";

Chart.register(...registerables);

const WidgetStat = ({
  employees,
  filteredDates,
  time_period,
  usdtKoef,
}: {
  employees: IEmployee[];
  filteredDates: IFiltersDates;
  time_period: periodItemsTypes;
  usdtKoef: number;
}) => {
  const [dataChart, setDataChart] = useState<ChartData<"line">>({
    labels: [],
    datasets: [
      {
        label: "Tips sum",
        data: [],
        fill: true,
        pointBackgroundColor: "rgba(254, 221, 47, 1)",
        backgroundColor: "rgba(254, 221, 47, 0.2)",
        borderColor: "rgba(254, 221, 47, 0.5)",
      },
    ],
  });

  useEffect(() => {
    const getTips = async () => {
      if (employees.length) {
        const tips = employees
          .map(({ tipSum, dates }) =>
            tipSum
              .map((tip, index) => ({
                sum_usd: tip,
                date: dates[index], // moment.unix(dates[index]).valueOf(),
              }))
              .filter((t) => t.date)
          )
          .flat()
          .filter(
            ({ date }) => date > filteredDates.start && date < filteredDates.end // moment().range(startDate, endDate);
          )
          .sort((a, b) => a.date - b.date)
          .map((t) => ({
            ...t,
            date: moment(t.date).format(dateFormat[time_period]),
          }));

        const initGroupDates = enumerateBetweenDates({
          startDate: filteredDates.start,
          endDate: filteredDates.end,
          timePeriod: time_period,
        }).reduce((acc, i) => ({ ...acc, [i]: 0 }), {});

        const groupTips = tips.reduce(
          (acc, t) => ({
            ...acc,
            [t.date]: acc[t.date] ? acc[t.date] + t.sum_usd : t.sum_usd,
          }),
          initGroupDates as { [key: string]: number }
        );

        const labels = Object.keys(groupTips).map((date: string) => date);
        const data = Object.values(groupTips).map(
          (sum: number) => +(sum * usdtKoef).toFixed(1)
        );

        setDataChart({
          ...dataChart,
          labels,
          datasets: [
            {
              ...dataChart.datasets[0],
              data: data,
            },
          ],
        });
      }
    };
    getTips();
  }, [employees, filteredDates, time_period, usdtKoef]);

  return (
    <div className="widget widget-stat">
      <div className="widget_graph">
        <Line data={dataChart} options={options} height={200} />
      </div>
    </div>
  );
};

export default WidgetStat;
