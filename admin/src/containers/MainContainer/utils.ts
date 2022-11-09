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
  arr.filter((t, i) => {
    const date = moment.unix(dates[i]).valueOf();
    return date > filteredDates.start && date < filteredDates.end;
  });
