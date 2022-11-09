import { useEffect, useState } from "react";
import { Col, Row } from "antd";

import BaseButton from "../../../../components/BaseButton";
import EmployeesModal from "../EmployeesModal";
import CardItem from "../../blocks/CardItem";
import Loader from "../../../../components/Loader";
import EmptyBlock from "../../../../components/EmptyBlock";

import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  addNotification,
  isValidateFilled,
  uploadToIpfs,
  getFromIpfs,
} from "../../../../utils";
import { getOrganization } from "../../../../store/types/Organization";
import { IEmployeeBase } from "../../../../types";
import { currentWalletConf } from "../../../../consts";
import { cardObjType } from "../../utils";

const initEmployee: IEmployeeBase = {
  name: "",
  address: "",
  photoLink: "",
};

const EmployeesBlock = () => {
  const dispatch = useAppDispatch();
  const { isMobile } = useWindowDimensions();
  const { organization } = useAppSelector((state) => state);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<string>("");
  const [loadingEmployee, setLoadingEmployee] = useState(false);
  const [employeesForm, setEmployeesForm] = useState<IEmployeeBase>({
    ...initEmployee,
  });
  const [photoValue, setPhotoValue] = useState<FileList | null>();

  const { allTipReceivers } = organization;

  const getItemName = async ({ address }: cardObjType) => {
    const { name } = await currentWalletConf.getEmployeeBase(address as string);
    return name;
  };

  const openEditModal = async ({ address }: cardObjType) => {
    try {
      if (address) {
        setEditedEmployee(address);
        setIsOpenModal(true);
        setLoadingEmployee(true);

        const { name, photoLink } = await currentWalletConf.getEmployeeBase(
          address
        );

        await getFromIpfs(photoLink, (result) =>
          setEmployeesForm({
            name,
            address,
            photoLink: result,
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingEmployee(false);
    }
  };

  const closeModal = () => {
    setEmployeesForm({
      ...initEmployee,
    });
    setIsOpenModal(false);
    setEditedEmployee("");
    setPhotoValue(null);
  };

  const deleteItem = async ({ address }: cardObjType) => {
    const itemInfo = await currentWalletConf.removeEmployeeFromOrg(
      address as string
    );
    itemInfo && dispatch(getOrganization());
  };

  const sendData = async (field?: keyof IEmployeeBase) => {
    setLoadingEmployee(true);
    const isValidate = isValidateFilled(Object.values(employeesForm));
    if (isValidate) {
      const isExistEmployeeInOrg = allTipReceivers.some(
        (employeeAddress) =>
          employeeAddress === employeesForm.address ||
          employeeAddress ===
            currentWalletConf.formatAddressStr({
              address: employeesForm.address,
              format: "fromHex",
            })
      );

      if (!editedEmployee && isExistEmployeeInOrg)
        return addNotification({
          type: "warning",
          title: "Is exists",
          message:
            "An employee with this address is already a member of the organization",
        });

      if (field && field === "name") {
        const editedEmployeeInfo = await currentWalletConf.getEmployeeBase(
          employeesForm.address
        );
        if (editedEmployeeInfo.name !== employeesForm.name) {
          const employeeInfo = await currentWalletConf.editEmployeeInOrg(
            employeesForm
          );
          if (employeeInfo) {
            dispatch(getOrganization());
            closeModal();
            return employeeInfo;
          }
        } else {
          return addNotification({
            type: "warning",
            title: "Employee name has not changed",
          });
        }
      } else if (photoValue && field && field === "photoLink") {
        const _uri = await uploadToIpfs(photoValue);
        if (_uri) {
          const employeeInfo = await currentWalletConf.changeEmployeePhoto({
            newPhoto: _uri,
            address: employeesForm.address,
          });
          if (employeeInfo) {
            dispatch(getOrganization());
            closeModal();
            return employeeInfo;
          }
        } else {
          return addNotification({
            type: "warning",
            title: "An error occurred while loading the image",
          });
        }
      } else if (photoValue) {
        const _uri = await uploadToIpfs(photoValue);
        if (_uri) {
          const employeeInfo = await currentWalletConf.addEmployeeToOrg({
            ...employeesForm,
            photoLink: _uri,
          });
          if (employeeInfo) {
            dispatch(getOrganization());
            closeModal();
            return employeeInfo;
          }
        } else {
          return addNotification({
            type: "warning",
            title: "An error occurred while loading the image",
          });
        }
      }
    } else {
      return addNotification({
        type: "warning",
        title: "Not all fields are filled",
      });
    }
    setLoadingEmployee(false);
  };

  useEffect(() => {
    !editedEmployee && setLoadingEmployee(false);
  }, [editedEmployee, isOpenModal]);

  return (
    <div className="block employees-list">
      <div className="header">
        <Row justify="space-between" align="middle">
          <Col xs={15} sm={18}>
            <p className="section-title title">Add and manage your employees</p>
          </Col>
          <Col xs={6} md={4}>
            <div className="btn">
              <BaseButton
                title="Add"
                onClick={() => setIsOpenModal(true)}
                fontSize={isMobile ? "20px" : "25px"}
                padding={`10px ${isMobile ? 20 : 30}px`}
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="list">
        {!organization.organizationName ? (
          <Loader size="big" />
        ) : (
          <Row gutter={[16, 32]}>
            {Boolean(allTipReceivers.length) ? (
              allTipReceivers.map((address) => (
                <Col xs={24} sm={12} key={address}>
                  <CardItem
                    data={{ address }}
                    openEditModal={openEditModal}
                    getCardName={getItemName}
                    deleteItem={deleteItem}
                  />
                </Col>
              ))
            ) : (
              <EmptyBlock />
            )}
          </Row>
        )}
      </div>
      <EmployeesModal
        isOpen={isOpenModal}
        isEdit={Boolean(editedEmployee)}
        loading={loadingEmployee}
        isNewPhotoValue={Boolean(photoValue && photoValue.length)}
        employeesForm={employeesForm}
        setEmployeesForm={setEmployeesForm}
        setPhotoValue={setPhotoValue}
        closeModal={closeModal}
        sendData={sendData}
      />
    </div>
  );
};

export default EmployeesBlock;
