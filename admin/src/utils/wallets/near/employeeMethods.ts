import { initEmployee } from "../../../consts";
import { IEmployeeBase, IWalletMethods, IChangePhotoObj } from "../../../types";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../../notifications";

// employee
export const addNearEmployeeToOrg = async (
  employee: IEmployeeBase,
  methods: IWalletMethods
) => {
  try {
    const { address, name, photoLink } = employee;
    const contractData = await methods.getBlockchainContractData();
    const employeeInfo = await contractData.add_tip_receiver_to_org({
      tip_receiver_address: address,
      name,
      photo_link: photoLink,
    });

    console.log(employeeInfo);

    addSuccessNotification({
      title: "Processed successfully!",
    });
    return true; //employeeInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};

export const getNearEmployeeInfo = async (
  employeeAddress: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const employeeInfo = await contractData.show_tip_receiver({
      tip_receiver: employeeAddress,
    });
    if (employeeInfo) {
      const {
        tip_receiver,
        org_owner,
        tip_receiver_name,
        tip_sum,
        tip_amount_to_withdraw,
        tip_receiver_photo,
        review,
        date,
      } = employeeInfo;

      return {
        address: tip_receiver,
        orgOwner: org_owner,
        name: tip_receiver_name,
        photoLink: tip_receiver_photo,
        tipSum: tip_sum.map((sum: number) =>
          methods.formatNumber(sum.toLocaleString('fullwide', {useGrouping:false}))
        ),
        tipAmountToWithdraw: methods.formatNumber(
          tip_amount_to_withdraw.toLocaleString('fullwide', {useGrouping:false})
        ),
        reviews: review,
        dates: date,
      };
    }
    return initEmployee;
  } catch (error) {
    console.log((error as Error).message || error);
    return initEmployee;
  }
};

export const getNearEmployeeBase = async (
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

export const getNearEmployeePhoto = async (
  employeeAddress: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const employeePhoto = await contractData.show_receiver_photo({
      tip_receiver: employeeAddress,
    });
    return employeePhoto;
  } catch (error) {
    console.log((error as Error).message);
    return false;
  }
};

export const changeNearEmployeePhoto = async (
  changePhotoObj: IChangePhotoObj,
  methods: IWalletMethods
) => {
  try {
    const { address, newPhoto } = changePhotoObj;
    const contractData = await methods.getBlockchainContractData();
    const employeeInfo = await contractData.change_tip_receiver_photo({
      photo_link: newPhoto,
      tip_receiver: address,
    });
    console.log(employeeInfo);

    addSuccessNotification({
      title: "Processed successfully!",
    });
    return true; //employeeInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};

export const editNearEmployeeName = async (
  employee: IEmployeeBase,
  methods: IWalletMethods
) => {
  try {
    const { address, name } = employee;
    const contractData = await methods.getBlockchainContractData();
    const employeeInfo = await contractData.change_tip_receiver_name({
      name,
      tip_receiver: address,
    });
    console.log(employeeInfo);

    addSuccessNotification({
      title: "Processed successfully!",
    });
    return true; //employeeInfo;
  } catch (error) {
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};

export const removeNearEmployeeFromOrg = async (
  employeeAddress: string,
  methods: IWalletMethods
) => {
  try {
    const contractData = await methods.getBlockchainContractData();
    const removedEmployee = await contractData.remove_tip_receiver_from_org({
      tip_receiver: employeeAddress,
    });
    console.log(removedEmployee);

    addSuccessNotification({
      title: "Processed successfully!",
    });
    return true; // removedEmployee;
  } catch (error) {
    console.log((error as Error).message);
    addErrorNotification({
      title: (error as Error).message || "Processing error. Try again!",
    });
    return false;
  }
};
