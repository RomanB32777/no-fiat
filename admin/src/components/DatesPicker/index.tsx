import { Col, DatePicker, Row } from "antd";
import clsx from "clsx";
import "./styles.sass";

const { RangePicker } = DatePicker;

const DatesPicker = ({
  label,
  gutter,
  modificator,
  labelCol,
  inputCol,
  onChange,
  toFormat,
}: {
  label?: string;
  gutter?: number | [number, number];
  modificator?: string;
  labelCol?: number;
  inputCol?: number;
  onChange: (startDate: string, endDate: string) => void;
  toFormat?: string;
}) => {
  return (
    <div className="datesPicker">
      <Row gutter={gutter || 0} align="middle">
        {/*  justify="space-between" */}
        <Col
          md={labelCol || (label ? 12 : 0)}
          xs={24}
          className="datesPicker__label_wrapper"
        >
          <span className="datesPicker__label">{label}</span>
        </Col>
        <Col
          md={inputCol || (label ? 12 : 24)}
          xs={24}
          className={clsx("datesPicker__input", {
            [modificator as string]: modificator,
          })}
        >
          <RangePicker
            format="DD/MM/YYYY"
            bordered={false}
            onChange={(val) =>
              val?.[0] && val?.[1]
                ? onChange(
                    val?.[0]?.format(toFormat || "DD/MM/YYYY"),
                    val?.[1]?.format(toFormat || "DD/MM/YYYY")
                  )
                : onChange("", "")
            }
            disabledDate={(d) => !d || d.isAfter()}
            popupClassName="app-calendar"
          />
        </Col>
      </Row>
    </div>
  );
};

export default DatesPicker;
