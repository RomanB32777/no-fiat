import { initEmployee } from "../../../consts";
import { IEmployeeBase, IWalletMethods } from "../../../types";
import { IChangePhotoObj } from "../../../types/wallet";

// employee
export const addTronEmployeeToOrg = async (
  employee: IEmployeeBase,
  methods: IWalletMethods
) => {
  try {
    const { address, name, photoLink } = employee;
    const contractData = await methods.getBlockchainContractData();
    const employeeInfo = await contractData
      .addTipReceiverToOrg(address, name, photoLink)
      .send();
    return employeeInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getTronEmployeeInfo = async (
  employeeAddress: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const employeeInfo = await contractData
      .showTipReceiver(employeeAddress)
      .call();
    if (employeeInfo) {
      const [
        tipReceiver,
        orgOwner,
        tipReceiverName,
        tipSum,
        tipAmountToWithdraw,
        review,
        date,
      ] = employeeInfo;

      const photoLink = await methods.getEmployeePhoto(employeeAddress);

      return {
        address: tipReceiver,
        orgOwner,
        name: tipReceiverName,
        photoLink,
        tipSum: tipSum.map((tip: any) => methods.formatNumber(tip)),
        tipAmountToWithdraw: methods.formatNumber(tipAmountToWithdraw),
        reviews: review,
        dates: date,
      };
    }
    return initEmployee;
  } catch (error) {
    console.log(error);
    return initEmployee;
  }
};

export const getTronEmployeeBase = async (
  address: string,
  methods: IWalletMethods
) => {
  const itemInfo = await methods.getEmployeeInfo(address);
  if (itemInfo && itemInfo.name) {
    const { name, photoLink } = itemInfo;
    return { address, name, photoLink };
  }
  return { address, name: "", photoLink: "" };
};

export const getTronEmployeePhoto = async (
  employeeAddress: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const employeePhoto = await contractData
      .showRecieverPhoto(employeeAddress)
      .call();
    return employeePhoto;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const changeTronEmployeePhoto = async (
  changePhotoObj: IChangePhotoObj,
  methods: IWalletMethods
) => {
  try {
    const { address, newPhoto } = changePhotoObj;
    const contractData = await methods.getBlockchainContractData();
    const employeeInfo = await contractData
      .changeTipReceiverPhoto(newPhoto, address)
      .send();
    return employeeInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const editTronEmployeeToOrg = async (
  employee: IEmployeeBase,
  methods: IWalletMethods
) => {
  try {
    const { address, name } = employee;
    const contractData = await methods.getBlockchainContractData();
    const employeeInfo = await contractData
      .changeTipReceiverName(name, address)
      .send();
    return employeeInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeTronEmployeeFromOrg = async (
  employeeAddress: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const removedEmployee = await contractData
      .removeTipReceiverFromOrg(employeeAddress)
      .send();
    return removedEmployee;
  } catch (error) {
    console.log(error);
    return false;
  }
};
