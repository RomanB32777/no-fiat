import { useContext, useEffect, useState } from "react";
import TableComponent from "../../../../components/TableComponent";
import { WalletContext } from "../../../../contexts/Wallet";
import { ITableData, tableColums } from "./tableData";
import { IEmployee, IFiltersDates } from "../../../../types";
import "./styles.sass";

const WidgetTipBreakdown = ({
  employees,
  filteredDates,
  usdtKoef,
}: {
  employees: IEmployee[];
  filteredDates: IFiltersDates;
  usdtKoef: number;
}) => {
  const { currentWalletConf } = useContext(WalletContext);
  const [tipsList, setTipsList] = useState<ITableData[]>([]);

  useEffect(() => {
    const getTips = async () => {
      if (employees.length) {
        const tips: ITableData[] = employees
          .map(({ address, name, tipSum, dates }) =>
            tipSum
              .map((tip, index) => ({
                key: address + dates[index],
                address,
                employee: name,
                sum_token: tip,
                sum_usd: tip * usdtKoef,
                date: dates[index], // moment.unix(dates[index]).valueOf(),
                blockchain: currentWalletConf?.nativeCurrency.symbol || "TRX",
              }))
              .filter((t) => t.date)
          )
          .flat()
          .filter(
            ({ date }) => date > filteredDates.start && date < filteredDates.end
          )
          .sort((a, b) => b.date - a.date);

        setTipsList(tips);
      } else setTipsList([]);
    };
    getTips();
  }, [employees, filteredDates, usdtKoef]);

  return (
    <div className="widget widget-tipBreakdown">
      <div className="widget_header">
        <span className="section-title widget_header__title">
          Tip breakdown
        </span>
      </div>
      <div className="widget__items">
        <TableComponent
          dataSource={tipsList}
          columns={tableColums}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default WidgetTipBreakdown;
