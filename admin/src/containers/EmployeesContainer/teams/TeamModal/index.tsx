import { PlusOutlined } from "@ant-design/icons";
import { Col, Form, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import BaseButton from "../../../../components/BaseButton";
import ConfirmPopup from "../../../../components/ConfirmPopup";
import FormInput from "../../../../components/FormInput";
import ModalComponent from "../../../../components/ModalComponent";
import { WalletContext } from "../../../../contexts/Wallet";
// import { currentWalletConf } from "../../../../consts";
import { useAppSelector } from "../../../../store/hooks";
import { ITeam, teamFields } from "../../../../types";
import {
  addErrorNotification,
  addInvalidAddress,
  addNotValidForm,
  isValidateFilled,
} from "../../../../utils";
import { checkChangedEmployees, checkExistAddressInArr } from "../../utils";
import "./styles.sass";

const formName = "teamForm";

const minNumber = 0;
const maxNumber = 100;

const TeamModal = ({
  isOpen,
  loading,
  editedTeam,
  teamForm,
  disabledEdit,
  closeModal,
  deleteEmployeeInTeam,
  sendData,
}: {
  isOpen: boolean;
  loading: boolean;
  editedTeam: string | null;
  teamForm: ITeam;
  disabledEdit?: boolean;
  closeModal: () => void;
  deleteEmployeeInTeam: (address: string) => Promise<any>;
  sendData: (data: { team: ITeam; field: teamFields | null }) => Promise<any>;
}) => {
  const { currentWalletConf } = useContext(WalletContext);
  const { organization } = useAppSelector((state) => state);
  const [form] = Form.useForm<ITeam>();
  const [editedField, setEditedField] = useState<teamFields | null>(null);

  const { allTipReceivers, teams } = organization;

  const isValidateForm = (team: ITeam): boolean => {
    const beforeEditTeam = organization.teams.find(
      (t) => t.name === editedTeam
    );
    const isFilledForm =
      isValidateFilled(Object.values(team)) &&
      isValidateFilled(team.employeesInTeam);
    if (!isFilledForm) {
      addNotValidForm();
      return false;
    }

    if (beforeEditTeam) {
      const addedEmployee = checkChangedEmployees(team, beforeEditTeam);
      if (addedEmployee) {
        const isExistEmployeesInOrg =
          allTipReceivers.some((address) =>
            checkExistAddressInArr(address, addedEmployee)
          ) ||
          teams.some((t) =>
            t.employeesInTeam.some((address) =>
              checkExistAddressInArr(address, addedEmployee)
            )
          );
        if (isExistEmployeesInOrg) {
          addErrorNotification({
            title:
              "Tip Receiver with this address has already been added to the organization",
          });
          return false;
        } else {
          const isValidAddress =
            currentWalletConf.isValidAddress(addedEmployee);

          if (!isValidAddress) {
            addInvalidAddress();
            return false;
          }
          return true;
        }
      } else if (
        team.employeesInTeam.length !== beforeEditTeam.employeesInTeam.length
      ) {
        addErrorNotification({
          title:
            "Tip Receiver with this address has already been added to the organization",
        });
        return false;
      }
    }
    return true;
  };

  const onFinish = async (values: ITeam) => {
    const addedEmployee = isValidateForm(values);
    addedEmployee &&
      (await sendData({
        team: { ...values, percentageToPay: Number(values.percentageToPay) },
        field: editedField,
      }));
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
        <Form form={form} onFinish={onFinish} name={formName}>
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
                      editedTeam && !disabledEdit ? (
                        <BaseButton
                          title="Change"
                          onClick={() => btnSubmit("name")} // sendData("name", editedTeam)
                          padding="16.5px 6px"
                          fontSize="20px"
                          disabled={loading}
                        />
                      ) : null
                    }
                    disabled={disabledEdit || loading}
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
                          disabled={loading}
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
                          const isVisibleActionBtn = editedTeam || index !== 0;

                          const isDeleting =
                            isExistEmployeeInTeam || !editedTeam;

                          const deleteEmployee = async () => {
                            const deletedEmployee =
                              employeesInTeamValues[index];
                            deletedEmployee &&
                              (await deleteEmployeeInTeam(deletedEmployee));
                            remove(field.name);
                          };

                          return (
                            <Form.Item
                              key={field.key}
                              style={{ margin: 0 }}
                              name="afdf"
                            >
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
                                  disabled={Boolean(editedTeam) && isDeleting}
                                  addonAfter={
                                    isVisibleActionBtn && !disabledEdit ? (
                                      <ConfirmPopup
                                        disabled={!isDeleting}
                                        confirm={deleteEmployee}
                                      >
                                        <BaseButton
                                          title={isDeleting ? "Delete" : "Add"}
                                          onClick={() =>
                                            !Boolean(editedTeam)
                                              ? remove(field.name)
                                              : !isDeleting &&
                                                btnSubmit("employeesInTeam")
                                          }
                                          padding={
                                            isExistEmployeeInTeam
                                              ? "16.5px 11px"
                                              : "16.5px 23px"
                                          }
                                          fontSize="20px"
                                          disabled={loading}
                                        />
                                      </ConfirmPopup>
                                    ) : null
                                  }
                                />
                              </Form.Item>
                            </Form.Item>
                          );
                        })}
                        {!disabledEdit && (
                          <Form.Item className="add-item-list">
                            <PlusOutlined
                              onClick={() => add()}
                              className="plus-icon"
                              disabled={loading}
                            />
                          </Form.Item>
                        )}
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
              disabled={!editedTeam && loading}
            />
          </div>
        )}
      </div>
    </ModalComponent>
  );
};

export default TeamModal;
