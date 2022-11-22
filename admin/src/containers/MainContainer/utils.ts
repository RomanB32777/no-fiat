import moment from "moment";
import { IEmployeeBase, IFiltersDates } from "../../types";

export interface IRatingTipsItem extends IEmployeeBase {
  review: number;
  sum: number;
  amountTips: number;
}

export const filterTips = ({
  arr,
  dates,
  filteredDates,
}: {
  arr: any[];
  dates: number[];
  filteredDates: IFiltersDates;
}) =>
  arr.filter(
    (t, i) => dates[i] > filteredDates.start && dates[i] < filteredDates.end
    // const date = dates[i]; //moment.unix(dates[i]).valueOf();
  );
