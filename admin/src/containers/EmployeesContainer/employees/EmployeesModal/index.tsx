import { useMemo } from "react";
import { Col, Row } from "antd";
import BaseButton from "../../../../components/BaseButton";
import FormInput from "../../../../components/FormInput";
import ModalComponent from "../../../../components/ModalComponent";
import UploadImage from "../../../../components/UploadImage";
import { IEmployeeBase } from "../../../../types";
import "./styles.sass";

const EmployeesModal = ({
  isOpen,
  isEdit,
  loading,
  isNewPhotoValue,
  employeesForm,
  setEmployeesForm,
  setPhotoValue,
  closeModal,
  sendData,
}: {
  isOpen: boolean;
  isEdit: boolean;
  loading: boolean;
  isNewPhotoValue: boolean;
  employeesForm: IEmployeeBase;
  setEmployeesForm: (employee: IEmployeeBase) => void;
  setPhotoValue: (photoValue: FileList) => void;
  closeModal: () => void;
  sendData: (field?: keyof IEmployeeBase) => Promise<any>;
}) => {
  const { address, name, photoLink } = employeesForm;

  const isChangedPhoto = useMemo(
    () => isEdit && isNewPhotoValue,
    [isEdit, isNewPhotoValue]
  );

  const editPhoto = async () => await sendData("photoLink");
  const editName = async () => await sendData("name");
  const createEmployee = async () => await sendData();

  return (
    <ModalComponent
      open={isOpen}
      title={isEdit ? "Change employee" : "Add new employee"}
      onCancel={closeModal}
      width={880}
      topModal
    >
      <div className="employee-modal">
        <Row gutter={[0, 36]} className="form">
          <Col xs={14} sm={8} md={isChangedPhoto ? 6 : 24}>
            <div className="form-element">
              <UploadImage
                label="Photo"
                formats={["JPG"]}
                filePreview={photoLink}
                imgName={photoLink}
                setFile={({ preview, file }) => {
                  setPhotoValue(file);
                  setEmployeesForm({ ...employeesForm, photoLink: preview });
                }}
                disabled={loading}
                loading={loading}
                labelCol={24}
                InputCol={24}
              />
            </div>
          </Col>
          {Boolean(isChangedPhoto) && (
            <Col
              xs={8}
              sm={10}
              md={6}
              offset={1}
              style={{ display: "flex", alignItems: "end" }}
            >
              <div className="form-element photo-edit">
                <BaseButton
                  title="Change"
                  padding="10px 20px"
                  onClick={editPhoto}
                  fontSize="18px"
                  disabled={isEdit && loading}
                />
              </div>
            </Col>
          )}
          <Col span={24}>
            <div className="form-element">
              <FormInput
                label="Name"
                placeholder="Name of employee"
                value={name}
                onChange={({ target }) =>
                  setEmployeesForm({ ...employeesForm, name: target.value })
                }
                labelCol={24}
                InputCol={24}
                gutter={[0, 16]}
                addonAfter={
                  isEdit ? (
                    <BaseButton
                      title="Change"
                      onClick={editName}
                      padding="16.5px 6px"
                      fontSize="20px"
                      disabled={loading}
                    />
                  ) : null
                }
                disabled={isEdit && loading}
              />
            </div>
          </Col>
          <Col span={24}>
            <div className="form-element">
              <FormInput
                label="Address"
                placeholder="Address of empoyee"
                value={address}
                onChange={({ target }) =>
                  setEmployeesForm({ ...employeesForm, address: target.value })
                }
                labelCol={24}
                InputCol={24}
                gutter={[0, 16]}
                disabled={isEdit}
              />
            </div>
          </Col>
        </Row>
        {!isEdit && (
          <div className="btn-create">
            <BaseButton
              title="Create"
              padding="10px 35px"
              onClick={createEmployee}
              fontSize="18px"
              disabled={loading}
            />
          </div>
        )}
      </div>
    </ModalComponent>
  );
};

export default EmployeesModal;
