import { DateFormatter } from "../../../../utils";
import type { ColumnsType } from "antd/es/table";

interface ITableData {
  key: string;
  employee: string;
  sum_token: number;
  sum_usd: number;
  date: number;
  blockchain: string;
}

export const tableColums: ColumnsType<ITableData> = [
  {
    title: "Employee",
    dataIndex: "employee",
    width: "20%",
    align: "center",
  },
  {
    title: "Token",
    dataIndex: "sum_token",
    width: "20%",
    align: "center",
    render: (sum, { blockchain }) => sum + ` ${blockchain}`,
  },
  {
    title: "USD",
    dataIndex: "sum_usd",
    width: "20%",
    align: "center",
    render: (sum) => sum.toFixed(1),
    sorter: (a, b) => a.sum_usd - b.sum_usd,
  },
  {
    title: "Date/Time",
    dataIndex: "date",
    width: "25%",
    align: "center",
    render: (date) => DateFormatter(new Date(date).toISOString()),
    sorter: (a, b) => a.date - b.date, // DateSorter(a.date, b.date),
  },
];

export type { ITableData };
