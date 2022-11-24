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
}

export async function getEmployeeInfo(
  this: IWalletConf,
  employeeAddress: string
) {
  try {
    const contractData = await this.getBlockchainContractData();
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
          this.formatNumber(
            sum.toLocaleString("fullwide", { useGrouping: false })
          )
        ),
        tipAmountToWithdraw: this.formatNumber(
          tip_amount_to_withdraw.toLocaleString("fullwide", {
            useGrouping: false,
          })
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
    const employeePhoto = await contractData.show_receiver_photo({
      tip_receiver: employeeAddress,
    });
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
}

export async function editEmployeeInOrg(
  this: IWalletConf,
  employee: IEmployeeBase
) {
  try {
    const { address, name } = employee;
    const contractData = await this.getBlockchainContractData();
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
}

export async function removeEmployeeFromOrg(
  this: IWalletConf,
  employeeAddress: string
) {
  try {
    const contractData = await this.getBlockchainContractData();
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
}
