import { useContext, useEffect, useMemo, useState } from "react";
import { Col, Row } from "antd";
import moment from "moment";

import Loader from "../../components/Loader";
import { WalletContext } from "../../contexts/Wallet";
import WidgetStat from "./blocks/WidgetStat";
import WidgetRatingTips from "./blocks/RatingTips";
import WidgetTipBreakdown from "./blocks/WidgetTipBreakdown";
import WidgetAverageTip from "./blocks/WidgetAverageTip";
import FiltersBlock from "./blocks/FiltersBlock";

import { useAppSelector } from "../../store/hooks";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { IEmployee, IFiltersDates, IFiltersForm } from "../../types";
import { getFromIpfs, getUsdKoef } from "../../utils";
import { currencyBlockchains } from "../../consts";
import "./styles.sass";

const initFiltersData: IFiltersForm = {
  time_period: "7_day",
  custom_time_period: ["", ""],
};

const MainContainer = () => {
  const { currentWalletConf, currentWalletName } = useContext(WalletContext);
  const { isTablet } = useWindowDimensions();
  const { user, organization, employee } = useAppSelector((state) => state);
  const [filtersData, setFiltersData] = useState<IFiltersForm>({
    ...initFiltersData,
  });

  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [usdtKoef, setUsdtKoef] = useState<number>(0);
  const [loadingDashboard, setLoadingDashboard] = useState<boolean>(true);

  const filtersHandler = (values: IFiltersForm) => {
    setFiltersData(values);
  };

  const { time_period, custom_time_period } = filtersData;

  const filteredDates: IFiltersDates = useMemo(
    () => ({
      start: custom_time_period.every((t) => Boolean(t))
        ? moment(custom_time_period[0]).startOf("day").valueOf()
        : moment()
            .subtract(...time_period.split("_"))
            .startOf("day")
            .valueOf(),
      end: custom_time_period.every((t) => Boolean(t))
        ? moment(custom_time_period[1]).endOf("day").valueOf()
        : moment().endOf("day").valueOf(),
    }),
    [time_period, custom_time_period]
  );

  useEffect(() => {
    const getEmployees = async () => {
      setLoadingDashboard(true);

      if (employee && user.userRole === "employee") {
        const resPhoto = getFromIpfs(employee.photoLink);
        if (resPhoto) setEmployees([{ ...employee, photoLink: resPhoto }]);
        else setEmployees([employee]);
      } else {
        const { allTipReceivers } = organization;

        if (allTipReceivers.length) {
          const employees: IEmployee[] = await Promise.all(
            allTipReceivers.map(async (address) => {
              const employee = await currentWalletConf.getEmployeeInfo(address);
              const resPhoto = getFromIpfs(employee.photoLink);
              if (resPhoto) return { ...employee, photoLink: resPhoto };
              return employee;
            })
          );
          setEmployees(employees);
        } else setEmployees([]);
      }
      setLoadingDashboard(false);
    };

    organization.organizationName && getEmployees();
    getUsdKoef(currencyBlockchains[currentWalletName], setUsdtKoef);
  }, [organization]);

  if (loadingDashboard) return <Loader size="large" />;

  return (
    <div className="dashboard-page">
      <p className="section-title title">{organization.organizationName}</p>
      <Row gutter={[32, 32]} className="widgets_container">
        <Col span={24}>
          <FiltersBlock
            filtersData={filtersData}
            filtersHandler={filtersHandler}
          />
        </Col>
        <Col xs={24} lg={14}>
          <WidgetStat
            employees={employees}
            filteredDates={filteredDates}
            time_period={time_period}
            usdtKoef={usdtKoef}
          />
        </Col>
        {!isTablet && (
          <Col lg={8} offset={2}>
            <WidgetAverageTip
              employees={employees}
              filteredDates={filteredDates}
              usdtKoef={usdtKoef}
            />
          </Col>
        )}
        <Col span={24}>
          <WidgetRatingTips
            employees={employees}
            filteredDates={filteredDates}
            usdtKoef={usdtKoef}
          />
        </Col>
        <Col span={24}>
          <WidgetTipBreakdown
            employees={employees}
            filteredDates={filteredDates}
            usdtKoef={usdtKoef}
          />
        </Col>
      </Row>
    </div>
  );
};

export default MainContainer;
