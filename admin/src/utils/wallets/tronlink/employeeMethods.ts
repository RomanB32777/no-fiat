import moment from "moment";
import { initEmployee } from "../../../consts";
import { IEmployeeBase, IWalletMethods, IChangePhotoObj } from "../../../types";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../../notifications";

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
    console.log(employeeInfo);

    employeeInfo &&
      addSuccessNotification({
        title: "Processed successfully!",
      });
    return employeeInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
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
        address: methods.formatAddressStr({
          address: tipReceiver,
          format: "fromHex",
        }),
        orgOwner: methods.formatAddressStr({
          address: orgOwner,
          format: "fromHex",
        }),
        name: tipReceiverName,
        photoLink,
        tipSum: tipSum.map((tip: any) => methods.formatNumber(tip)),
        tipAmountToWithdraw: methods.formatNumber(tipAmountToWithdraw),
        reviews: review,
        dates: date.map((d: any) => moment.unix(d).valueOf()),
      };
    }
    return initEmployee;
  } catch (error) {
    console.log((error as Error).message || error);
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
    console.log((error as Error).message);
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
    addSuccessNotification({
      title: "Processed successfully!",
    });
    return employeeInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};

export const editTronEmployeeName = async (
  employee: IEmployeeBase,
  methods: IWalletMethods
) => {
  try {
    const { address, name } = employee;
    const contractData = await methods.getBlockchainContractData();
    const employeeInfo = await contractData
      .changeTipReceiverName(name, address)
      .send();
    addSuccessNotification({
      title: "Processed successfully!",
    });
    return employeeInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
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
    addSuccessNotification({
      title: "Processed successfully!",
    });
    return removedEmployee;
  } catch (error) {
    console.log((error as Error).message);
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};
