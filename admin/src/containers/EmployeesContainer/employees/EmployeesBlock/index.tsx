import { useState } from "react";
import { Col, Empty, Row } from "antd";

import BaseButton from "../../../../components/BaseButton";
import EmployeesModal from "../EmployeesModal";
import CardItem from "../../blocks/CardItem";

import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  addNotification,
  isValidateFilled,
  makeStorageClient,
} from "../../../../utils";
import { getOrganization } from "../../../../store/types/Organization";
import { IEmployeeBase } from "../../../../types";
import { currentWalletConf } from "../../../../consts";

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
  const [isEditModal, setIsEditModal] = useState(false);
  const [employeesForm, setEmployeesForm] = useState<IEmployeeBase>({
    ...initEmployee,
  });
  const [photoValue, setPhotoValue] = useState<FileList>();

  const { allTipReceivers } = organization;

  const getItemName = async (address: string) => {
    const { name } = await currentWalletConf.getEmployeeBase(address);
    return name;
  };

  const openEditModal = async (employeeAddress: string) => {
    const { name, photoLink } = await currentWalletConf.getEmployeeBase(
      employeeAddress
    );
    setEmployeesForm({
      name,
      photoLink,
      address: employeeAddress,
    });
    setIsEditModal(true);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setEmployeesForm({
      ...initEmployee,
    });
    setIsOpenModal(false);
    setIsEditModal(false);
  };

  const deleteItem = async (address: string) => {
    const itemInfo = await currentWalletConf.removeEmployeeFromOrg(address);
    itemInfo && dispatch(getOrganization());
  };

  const createJSON = (_uri: string) => {
    const dict = { URI: _uri };
    const jsonDict = JSON.stringify(dict);
    const file = new File([jsonDict], "metadata.json", {
      type: "text/plain;charset=utf-8",
    });
    return file;
  };

  const storeFiles = async (file: File) => {
    const client = makeStorageClient();
    const cid = await client.put([file]);
    console.log("stored files with cid:", cid);
    const ipfsLink = "ipfs://" + cid;
    console.log(ipfsLink);
    return ipfsLink;
  };

  const uploadToIpfs = async () => {
    if (photoValue) {
      const file = photoValue[0];
      const sendFile = new File([file], file.name, { type: file.type });
      const _uri = await storeFiles(sendFile);
      const badgeDict = createJSON(_uri);
      const new_uri = await storeFiles(badgeDict);
      return new_uri;
    }
  };

  const sendData = async () => {
    const isValidate = isValidateFilled(Object.values(employeesForm));
    if (isValidate) {
      const isExistEmployeeInOrg = organization.allTipReceivers.some(
        (employeeAddress) => employeeAddress === employeesForm.address // !!!!!!!!!!
      );
      if (!isEditModal && isExistEmployeeInOrg)
        return addNotification({
          type: "warning",
          title: "Is exists",
          message:
            "An employee with this address is already a member of the organization",
        });

      const _uri = await uploadToIpfs();
      if (_uri) {
        const employeeInfo = await currentWalletConf[
          isEditModal ? "editEmployeeInOrg" : "addEmployeeToOrg"
        ]({ ...employeesForm, photoLink: _uri });

        if (employeeInfo) {
          dispatch(getOrganization());
          closeModal();
          return employeeInfo;
        }
      }
    } else {
      addNotification({
        type: "warning",
        title: "Not all fields are filled",
      });
    }
  };

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
        <Row gutter={[16, 16]}>
          {Boolean(allTipReceivers.length) ? (
            allTipReceivers.map((address) => (
              <Col xs={24} sm={12} key={address}>
                <CardItem
                  data={address}
                  openEditModal={openEditModal}
                  getCardName={getItemName}
                  deleteItem={deleteItem}
                />
              </Col>
            ))
          ) : (
            <Empty className="empty-el" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Row>
      </div>
      <EmployeesModal
        isOpen={isOpenModal}
        isEdit={isEditModal}
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
