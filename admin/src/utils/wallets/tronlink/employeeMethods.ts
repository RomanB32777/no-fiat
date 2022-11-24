import moment from "moment";
import { initEmployee } from "../../../consts";
import { IEmployeeBase, IWalletConf, IChangePhotoObj } from "../../../types";
import {
  addErrorNotification,
  addSuccessNotification,
} from "../../notifications";

// employee
export async function addEmployeeToOrg(
  this: IWalletConf,
  employee: IEmployeeBase
) {
  try {
    const { address, name, photoLink } = employee;
    const contractData = await this.getBlockchainContractData();
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
}

export async function getEmployeeInfo(
  this: IWalletConf,
  employeeAddress: string
) {
  try {
    const contractData = await this.getBlockchainContractData();
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

      const photoLink = await this.getEmployeePhoto(employeeAddress);

      return {
        address: this.formatAddressStr({
          address: tipReceiver,
          format: "fromHex",
        }),
        orgOwner: this.formatAddressStr({
          address: orgOwner,
          format: "fromHex",
        }),
        name: tipReceiverName,
        photoLink,
        tipSum: tipSum.map((tip: any) => this.formatNumber(tip)),
        tipAmountToWithdraw: this.formatNumber(tipAmountToWithdraw),
        reviews: review,
        dates: date.map((d: any) => moment.unix(d).valueOf()),
      };
    }
    return initEmployee;
  } catch (error) {
    console.log((error as Error).message || error);
    return initEmployee;
  }
}

export async function getEmployeeBase(this: IWalletConf, address: string) {
  const itemInfo = await this.getEmployeeInfo(address);
  if (itemInfo && itemInfo.name) {
    const { name, photoLink } = itemInfo;
    return { address, name, photoLink };
  }
  return { address, name: "", photoLink: "" };
}

export async function getEmployeePhoto(
  this: IWalletConf,
  employeeAddress: string
) {
  try {
    const contractData = await this.getBlockchainContractData();
    const employeePhoto = await contractData
      .showRecieverPhoto(employeeAddress)
      .call();
    return employeePhoto;
  } catch (error) {
    console.log((error as Error).message);
    return false;
  }
}

export async function changeEmployeePhoto(
  this: IWalletConf,
  changePhotoObj: IChangePhotoObj
) {
  try {
    const { address, newPhoto } = changePhotoObj;
    const contractData = await this.getBlockchainContractData();
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
}

export async function editEmployeeInOrg(
  this: IWalletConf,
  employee: IEmployeeBase
) {
  try {
    const { address, name } = employee;
    const contractData = await this.getBlockchainContractData();
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
}

export async function removeEmployeeFromOrg(
  this: IWalletConf,
  employeeAddress: string
) {
  try {
    const contractData = await this.getBlockchainContractData();
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
}
