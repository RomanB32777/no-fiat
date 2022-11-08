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
  employeesForm,
  setEmployeesForm,
  setPhotoValue,
  closeModal,
  sendData,
}: {
  isOpen: boolean;
  isEdit: boolean;
  employeesForm: IEmployeeBase;
  setEmployeesForm: (employee: IEmployeeBase) => void;
  setPhotoValue: (photoValue: FileList) => void;
  closeModal: () => void;
  sendData: () => Promise<any>;
}) => {
  const { address, name, photoLink } = employeesForm;

  const isChangedPhoto = useMemo(
    () => isEdit && photoLink.length, // && photoLink !== oldPhoto ??
    [isEdit, photoLink]
  );

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
          <Col span={isChangedPhoto ? 6 : 24}>
            <div className="form-element">
              <UploadImage
                label="Photo"
                formats={["PNG", "JPG", "JPEG"]}
                filePreview={photoLink}
                imgName={photoLink}
                setFile={({ preview, file }) => {
                  setPhotoValue(file);
                  setEmployeesForm({ ...employeesForm, photoLink: preview });
                }}
                labelCol={24}
                InputCol={24}
              />
            </div>
          </Col>
          {isChangedPhoto && (
            <Col
              span={6}
              offset={1}
              style={{ display: "flex", alignItems: "end" }}
            >
              <div className="form-element photo-edit">
                <BaseButton
                  title="Change"
                  padding="10px 20px"
                  onClick={sendData}
                  fontSize="18px"
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
                onChange={(value) =>
                  setEmployeesForm({ ...employeesForm, name: value })
                }
                labelCol={24}
                InputCol={24}
                gutter={[0, 16]}
                addonAfter={
                  isEdit ? (
                    <BaseButton
                      title="Change"
                      onClick={sendData}
                      padding="16.5px 6px"
                      fontSize="20px"
                    />
                  ) : null
                }
              />
            </div>
          </Col>
          <Col span={24}>
            <div className="form-element">
              <FormInput
                label="Address"
                placeholder="Address of empoyee"
                value={address}
                onChange={(value) =>
                  setEmployeesForm({ ...employeesForm, address: value })
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
              onClick={sendData}
              fontSize="18px"
            />
          </div>
        )}
      </div>
    </ModalComponent>
  );
};

export default EmployeesModal;
