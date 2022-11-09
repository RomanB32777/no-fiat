import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import { Col, Input, InputProps, Row } from "antd";
import clsx from "clsx";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "./styles.sass";
interface IFormInput extends InputProps {
  value?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  typeInput?: HTMLInputTypeAttribute;
  disabled?: boolean;
  modificator?: string;
  descriptionInput?: React.ReactNode;
  maxLength?: number;
  minNumber?: number;
  maxNumber?: number;
  isTextarea?: boolean;
  InputCol?: number;
  labelCol?: number;
  mobileInputCol?: number;
  gutter?: number | [number, number];
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  afterEl?: React.ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>; //(value: string) => void;
}

const FormInput = ({
  label,
  value,
  name,
  placeholder,
  typeInput,
  disabled,
  modificator,
  descriptionInput,
  maxLength,
  minNumber,
  maxNumber,
  isTextarea,
  InputCol,
  labelCol,
  mobileInputCol,
  gutter,
  addonBefore,
  addonAfter,
  afterEl,
  onChange,
}: IFormInput) => {
  const { isMobile } = useWindowDimensions();

  return (
    <div className="formInput">
      <Row
        gutter={gutter || 0}
        justify={afterEl ? "space-between" : "start"}
        align="middle"
      >
        <Col md={labelCol || (label ? 12 : 0)} xs={24} className="alignCenter">
          <span className="formInput__label">{label}</span>
        </Col>
        <Col md={InputCol || (label ? 12 : 24)} xs={mobileInputCol || 24}>
          <div
            className={clsx("formInput__input", {
              [modificator as string]: modificator,
            })}
          >
            {addonBefore && (
              <div className="formInput__input_addonBefore">{addonBefore}</div>
            )}
            <Input
              className={clsx({
                withAddonAfter: Boolean(addonAfter),
                withAddonBefore: Boolean(addonBefore),
              })}
              disabled={disabled} // || !Boolean(onChange)
              name={name || ""}
              placeholder={placeholder || ""}
              type={typeInput || "text"}
              min={minNumber || 0}
              max={maxNumber}
              maxLength={maxLength || 524288}
              onWheel={(e) => e.currentTarget.blur()}
              onChange={(e) => onChange && onChange(e)}
              value={value}
              bordered={false}
            />
            {addonAfter && (
              <div className="formInput__input_addonAfter">{addonAfter}</div>
            )}
          </div>
        </Col>
        {afterEl}
      </Row>
      {descriptionInput && (
        <Row>
          <Col
            offset={(!isMobile ? labelCol : 0) || (label && !isMobile ? 12 : 0)}
            md={InputCol || (label ? 12 : 24)}
          >
            <p className="formInput__description">{descriptionInput}</p>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FormInput;
