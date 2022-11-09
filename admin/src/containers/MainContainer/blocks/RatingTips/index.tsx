import { useEffect, useState } from "react";
import { Row } from "antd";
import EmptyBlock from "../../../../components/EmptyBlock";

import { filterTips, IRatingTipsItem } from "../../utils";
import { IEmployee, IFiltersDates } from "../../../../types";
import WidgetItem from "../WidgetItem";
import "./styles.sass";

const RatingTips = ({
  employees,
  filteredDates,
  usdtKoef,
}: {
  employees: IEmployee[];
  filteredDates: IFiltersDates;
  usdtKoef: number;
}) => {
  const [ratingTips, setRatingTips] = useState<IRatingTipsItem[]>([]);

  useEffect(() => {
    const getTips = async () => {
      if (employees.length) {
        const tips: IRatingTipsItem[] = employees.map(
          ({ address, name, photoLink, tipSum, reviews, dates }) => {
            const filterSum = filterTips({ arr: tipSum, dates, filteredDates });
            const filterReviews = filterTips({
              arr: reviews,
              dates,
              filteredDates,
            });
            return {
              address,
              name,
              photoLink,
              review:
                filterReviews.reduce((prev, curr) => prev + curr, 0) /
                filterReviews.length,
              sum: filterSum.reduce((prev, curr) => prev + curr, 0),
              amountTips: filterSum.length,
            };
          }
        );
        setRatingTips(tips.filter((t) => t.amountTips));
      } else setRatingTips([]);
    };
    getTips();
  }, [employees, filteredDates]);

  return (
    <div className="widget widget-ratingTips">
      <div className="widget_header">
        <span className="section-title widget_header__title">Rating / Tip</span>
      </div>

      {Boolean(ratingTips.length) ? (
        <div className="widget__items">
          <Row gutter={[16, 16]}>
            {ratingTips.map((ratingTip) => (
              <WidgetItem
                key={ratingTip.address}
                itemData={ratingTip}
                usdtKoef={usdtKoef}
              />
            ))}
          </Row>
        </div>
      ) : (
        <EmptyBlock />
      )}
    </div>
  );
};

export default RatingTips;
