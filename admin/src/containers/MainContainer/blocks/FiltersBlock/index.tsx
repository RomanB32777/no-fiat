import { Col, Row } from "antd";
import DatesPicker from "../../../../components/DatesPicker";
import SelectInput from "../../../../components/SelectInput";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { periodItemsTypes } from "../../../../utils/dateMethods/types";
import { filterPeriodItems } from "../../../../utils/dateMethods/consts";
import { IFiltersForm } from "../../../../types";
import "./styles.sass";

const SelectDropdown = (menu: React.ReactElement) => {
  return <div className="select-dropdown">{menu}</div>;
};

const FiltersBlock = ({
  filtersData,
  filtersHandler,
}: {
  filtersData: IFiltersForm;
  filtersHandler: (values: IFiltersForm) => void;
}) => {
  const { isTablet } = useWindowDimensions();
  const { time_period } = filtersData;

  return (
    <div className="block block-filters">
      <Row justify="space-between" align="middle" gutter={[32, 32]}>
        <Col xs={12} md={14}>
          <DatesPicker
            label="Choose the exact time period"
            onChange={(startDate, endDate) =>
              filtersHandler({
                ...filtersData,
                custom_time_period: [startDate, endDate],
              })
            }
            toFormat="YYYY-MM-DD"
            labelCol={isTablet ? 24 : 12}
            modificator="dates"
            gutter={[8, 8]}
          />
        </Col>
        <Col xs={12} sm={10} md={8} lg={6}>
          <SelectInput
            value={time_period}
            list={Object.keys(filterPeriodItems).map((key) => ({
              key,
              value: filterPeriodItems[key as periodItemsTypes],
            }))}
            modificator="timePeriod-select"
            dropdownClassName="dates-select-list"
            dropdownRender={SelectDropdown}
            onChange={(selected) =>
              filtersHandler({
                ...filtersData,
                time_period: selected as periodItemsTypes,
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default FiltersBlock;
