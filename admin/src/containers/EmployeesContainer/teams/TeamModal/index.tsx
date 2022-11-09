import { PlusOutlined } from "@ant-design/icons";
import { Col, Form, Row } from "antd";
import { useEffect, useState } from "react";
import BaseButton from "../../../../components/BaseButton";
import FormInput from "../../../../components/FormInput";
import ModalComponent from "../../../../components/ModalComponent";
import { ITeam, teamFields } from "../../../../types";
import "./styles.sass";

const minNumber = 0;
const maxNumber = 100;

const TeamModal = ({
  isOpen,
  editedTeam,
  teamForm,
  closeModal,
  sendData,
}: {
  isOpen: boolean;
  editedTeam: string | null;
  teamForm: ITeam;
  closeModal: () => void;
  sendData: (data: { team: ITeam; field: teamFields | null }) => Promise<any>;
}) => {
  const [form] = Form.useForm<ITeam>();
  const [editedField, setEditedField] = useState<teamFields | null>(null);

  const onFinish = async (values: ITeam) => {
    console.log(values);

    await sendData({
      team: { ...values, percentageToPay: Number(values.percentageToPay) },
      field: editedField,
    });
  };

  const btnSubmit = (field?: teamFields) => {
    field && setEditedField(field);
    setTimeout(() => form.submit(), 0);
  };

  const closeSubmit = () => {
    form.resetFields();
    setEditedField(null);
    closeModal();
  };

  useEffect(() => {
    editedTeam && form.setFieldsValue({ ...teamForm });
  }, [editedTeam, teamForm]);

  return (
    <ModalComponent
      open={isOpen}
      title={editedTeam ? "Change team" : "Create new team"}
      onCancel={closeSubmit}
      width={880}
      topModal
    >
      <div className="team-modal">
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[0, 36]} className="form" justify="center">
            <Col span={24}>
              <div className="form-element">
                <Form.Item name="name" noStyle>
                  <FormInput
                    label="Name"
                    placeholder="Type the name team..."
                    labelCol={24}
                    InputCol={24}
                    gutter={[0, 16]}
                    addonAfter={
                      editedTeam ? (
                        <BaseButton
                          title="Change"
                          onClick={() => btnSubmit("name")} // sendData("name", editedTeam)
                          padding="16.5px 6px"
                          fontSize="20px"
                        />
                      ) : null
                    }
                  />
                </Form.Item>
              </div>
            </Col>
            <Col span={24}>
              <div className="form-element">
                <Form.Item name="percentageToPay" noStyle>
                  <FormInput
                    typeInput="number"
                    minNumber={minNumber}
                    maxNumber={maxNumber}
                    label="Percentage of incoming tip"
                    placeholder="%"
                    // value={percentageToPay ? String(percentageToPay) : ""}
                    // onChange={(value) =>
                    //   setTeamForm({
                    //     ...teamForm,
                    //     percentageToPay:
                    //       +value > maxNumber || +value < minNumber
                    //         ? teamForm.percentageToPay
                    //         : +value,
                    //   })
                    // }
                    labelCol={24}
                    InputCol={24}
                    gutter={[0, 16]}
                    addonAfter={
                      editedTeam ? (
                        <BaseButton
                          title="Change"
                          onClick={() => btnSubmit("percentageToPay")}
                          padding="16.5px 6px"
                          fontSize="20px"
                        />
                      ) : null
                    }
                  />
                </Form.Item>
              </div>
            </Col>
            <Col span={24}>
              <div className="form-element">
                <Form.List name="employeesInTeam" initialValue={[""]}>
                  {(fields, { add, remove }) => {
                    const employeesInTeamValues =
                      form.getFieldValue("employeesInTeam");
                    return (
                      <>
                        {fields.map((field, index) => {
                          const isExistEmployeeInTeam =
                            teamForm.employeesInTeam.some(
                              (e) => e === employeesInTeamValues[index]
                            );
                          const isVisibleDeleteBtn = editedTeam || index !== 0;
                          const isDeleting =
                            isExistEmployeeInTeam || !editedTeam;

                          const deletingMethod = () => {
                            remove(field.name);
                            editedTeam && btnSubmit("employeesInTeam");
                          };

                          return (
                            <Form.Item key={field.key} style={{ margin: 0 }}>
                              <Form.Item {...field} noStyle>
                                <FormInput
                                  label={
                                    index === 0
                                      ? "Addresses of team participants"
                                      : ""
                                  }
                                  placeholder="Address"
                                  labelCol={24}
                                  InputCol={24}
                                  gutter={[0, 16]}
                                  addonAfter={
                                    isVisibleDeleteBtn ? (
                                      <BaseButton
                                        // <ConfirmPopup confirm={deleteCard}>
                                        title={isDeleting ? "Delete" : "Add"}
                                        onClick={() =>
                                          isDeleting
                                            ? deletingMethod()
                                            : btnSubmit("employeesInTeam")
                                        }
                                        padding={
                                          isExistEmployeeInTeam
                                            ? "16.5px 11px"
                                            : "16.5px 23px"
                                        }
                                        fontSize="20px"
                                      />
                                    ) : null
                                  }
                                />
                              </Form.Item>
                            </Form.Item>
                          );
                        })}
                        <Form.Item className="add-item-list">
                          <PlusOutlined
                            onClick={() => add()}
                            className="plus-icon"
                          />
                        </Form.Item>
                      </>
                    );
                  }}
                </Form.List>
              </div>
            </Col>
          </Row>
        </Form>

        {!editedTeam && (
          <div className="btn-create">
            <BaseButton
              title="Create"
              padding="10px 35px"
              onClick={() => btnSubmit()}
              fontSize="18px"
            />
          </div>
        )}
      </div>
    </ModalComponent>
  );
};

export default TeamModal;
