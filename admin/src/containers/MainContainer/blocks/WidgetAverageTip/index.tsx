import { useEffect, useState } from "react";
import { Progress } from "antd";
import { filterTips } from "../../utils";
import { IEmployee, IFiltersDates } from "../../../../types";
import "./styles.sass";

interface IStatData {
  review: number;
  sum: number;
  count: number;
}

const initStatData = { review: 0, sum: 0, count: 0 };

const WidgetAverageTip = ({
  employees,
  filteredDates,
  usdtKoef,
}: {
  employees: IEmployee[];
  filteredDates: IFiltersDates;
  usdtKoef: number;
}) => {
  const [statData, setStatData] = useState<IStatData>(initStatData);

  useEffect(() => {
    const getTips = async () => {
      if (employees.length) {
        const allStatData: IStatData = employees.reduce(
          (acc, { tipSum, reviews, dates }) => {
            const filterSum = filterTips({ arr: tipSum, dates, filteredDates });
            const filterReviews = filterTips({
              arr: reviews,
              dates,
              filteredDates,
            });

            return {
              ...acc,
              sum: acc.sum + filterSum.reduce((prev, curr) => prev + curr, 0),
              review:
                acc.review +
                filterReviews.reduce(
                  (prev, curr) => (curr >= 4 ? prev + 1 : prev),
                  0
                ),
              count: acc.count + filterReviews.length,
            };
          },
          initStatData
        );
        setStatData(allStatData);
      } else setStatData(initStatData);
    };
    getTips();
  }, [employees, filteredDates]);

  const { review, sum, count } = statData;

  return (
    <div className="widget widget-averageTip">
      <Progress
        type="circle"
        percent={+(count ? (review / count) * 100 : 0).toFixed(0)}
        width={300}
        strokeColor="#FEDD2F"
        format={(percent) => (
          <div className="progress-text">
            <p className="title">{percent}%</p>
            <p className="title-bottom">positive reviews</p>
          </div>
        )}
      />
      <div className="description">
        <p className="title">
          {(count ? (sum / count) * usdtKoef : 0).toFixed(1)} USD
        </p>
        <p className="title-bottom">Average tip amount</p>
      </div>
    </div>
  );
};

export default WidgetAverageTip;
