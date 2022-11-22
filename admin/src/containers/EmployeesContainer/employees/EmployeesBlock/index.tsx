import { useContext, useEffect, useState } from "react";
import { Col, Row } from "antd";

import BaseButton from "../../../../components/BaseButton";
import EmployeesModal from "../EmployeesModal";
import CardItem from "../../blocks/CardItem";
import Loader from "../../../../components/Loader";
import EmptyBlock from "../../../../components/EmptyBlock";
import { WalletContext } from "../../../../contexts/Wallet";

import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  isValidateFilled,
  uploadToIpfs,
  getFromIpfs,
  addErrorNotification,
  addNotValidForm,
  addInvalidAddress,
} from "../../../../utils";
import { getOrganization } from "../../../../store/types/Organization";
import { cardObjType, checkExistAddressInOrg } from "../../utils";
import { IEmployeeBase } from "../../../../types";

const initEmployee: IEmployeeBase = {
  name: "",
  address: "",
  photoLink: "",
};

const EmployeesBlock = () => {
  const { currentWalletConf } = useContext(WalletContext);
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

  const { allTipReceivers, teams } = organization;

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

        const photoImage = getFromIpfs(photoLink);

        setEmployeesForm({
          name,
          address,
          photoLink: photoImage,
        });

        // await getFromIpfs(photoLink, (result) =>
        // setEmployeesForm({
        //   name,
        //   address,
        //   photoLink: result,
        // })
        // );
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
    const isValidate = isValidateFilled(Object.values(employeesForm));
    if (isValidate) {
      setLoadingEmployee(true);

      const isVallidAddress = currentWalletConf.isValidAddress(
        employeesForm.address
      );

      if (!isVallidAddress) {
        setLoadingEmployee(false);
        return addInvalidAddress();
      }

      if (!editedEmployee) {
        console.log(allTipReceivers, teams, employeesForm.address);

        const isExistEmployeeInOrg = checkExistAddressInOrg({
          allTipReceivers,
          teams,
          checkAddress: employeesForm.address,
        });

        const isTipReceiverEmployee =
          await currentWalletConf.checkIfTipReciever(employeesForm.address);
        // check tip_receiver in other organization

        const isExistEmployeeInTeamsContract =
          await currentWalletConf.checkIsTeamMember(employeesForm.address);

        if (
          isExistEmployeeInOrg ||
          isTipReceiverEmployee ||
          isExistEmployeeInTeamsContract.isExist
        ) {
          setLoadingEmployee(false);
          return addErrorNotification({
            title:
              "Tip Receiver with this address has already been added to the organization",
          });
        }
      }

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
            // return employeeInfo;
          }
        } else {
          addErrorNotification({
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
            // return employeeInfo;
          }
        } else {
          addErrorNotification({
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
            // return employeeInfo;
          }
        } else {
          addErrorNotification({
            title: "An error occurred while loading the image",
          });
        }
      }
      setLoadingEmployee(false);
    } else {
      addNotValidForm();
    }
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
          <Loader size="large" />
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
