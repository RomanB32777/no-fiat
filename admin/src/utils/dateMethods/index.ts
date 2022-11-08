import { periodItemsTypes } from "./types";
import moment from "moment";
import { filterPeriodItems } from "./consts";

export const DateTimezoneFormatter = (date: string) => {
  const initDate = new Date(date);
  const formatedDate = initDate.getTime();
  const userOffset = initDate.getTimezoneOffset() * 60 * 1000;
  return new Date(formatedDate + userOffset).toISOString();
};

export const DateFormatter = (
  date: string,
  toFormat: string = "DD/MM/YYYY HH:mm"
) => {
  let dateFormat = moment(date).format(toFormat);
  if (dateFormat === "Invalid Date") dateFormat = "";
  return dateFormat;
};

export const DateSorter = (a: string, b: string) =>
  Date.parse(a) &&
  Date.parse(b) &&
  new Date(a).getTime() - new Date(b).getTime();

// period-time
export const getTimePeriodQuery: (timePeriod: string) => periodItemsTypes = (
  timePeriod
) => {
  const findKey = Object.keys(filterPeriodItems).find(
    (key) => filterPeriodItems[key as periodItemsTypes] === timePeriod
  );
  return findKey ? (findKey as periodItemsTypes) : "7_day"; // : keyof IFilterPeriodItems
};
