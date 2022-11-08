import moment from "moment";
import { IFiltersDates } from "../../types";

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
