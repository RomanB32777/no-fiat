import { Col, Row } from "antd";
import DatesPicker from "../../../../components/DatesPicker";
import SelectInput from "../../../../components/SelectInput";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { periodItemsTypes } from "../../../../utils/dateMethods/types";
import { filterPeriodItems } from "../../../../utils/dateMethods/consts";
import { IFiltersForm } from "../../../../types";
import "./styles.sass";

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
      <Row justify="space-between" align="middle">
        <Col span={12}>
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
            gutter={[8, 8]}
          />
        </Col>
        <Col xs={10} md={6} lg={4}>
          <SelectInput
            value={time_period}
            list={Object.keys(filterPeriodItems).map((key) => ({
              key,
              value: filterPeriodItems[key as periodItemsTypes],
            }))}
            modificator="timePeriod-select"
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
