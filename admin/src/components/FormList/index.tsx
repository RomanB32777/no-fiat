import { PlusOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import "./styles.sass";

const FormList = ({
  name,
  list,
  label,
  listCol,
  labelCol,
  gutter,
  onChange
}: {
  name: string;
  list: string[];
  label?: string;
  listCol?: number;
  labelCol?: number;
  gutter?: number | [number, number];
  onChange?: (value: string) => void;
}) => {
  return (
    <div className="formList">
      <Row gutter={gutter || 0} align="middle">
        <Col md={labelCol || (label ? 12 : 0)} xs={24}>
          <span className="formList__label">{label}</span>
        </Col>
        <Col md={listCol || (label ? 12 : 24)} xs={24}>
          <div className="formList__list">
            {/* <Form.List name="employees" initialValue={[""]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                label={`Сотрудник ${fields.length > 1 ? index + 1 : ""}`}
                required={true}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  noStyle
                >
                  <Select
                    showSearch
                    options={employees
                      .filter((e) =>
                        fields.length > 1 ? filterEmployeesList(e) : true
                      )
                      .map((e) => createEmployeesListItem(e))}
                    onSelect={(selected: number | string) =>
                      Number(selected)
                        ? setIsSelectedCooperative(false)
                        : setIsSelectedCooperative(true)
                    }
                    filterOption={(input, option) =>
                      option?.label
                        ? option.label
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0 ||
                          option.label
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        : false
                    }
                    style={{ width: "90%" }}
                  />
                </Form.Item>
              </Form.Item>
            ))}
          </>
        )}
      </Form.List> */}
          </div>
        </Col>
      </Row>
      <PlusOutlined className="dynamic-button" onClick={() => {}} />
    </div>
  );
};

export default FormList;
