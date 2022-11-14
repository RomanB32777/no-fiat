import { Store } from "react-notifications-component";
import { INotification, INotificationWithoutType } from "./types";

export const addNotification = ({
  type,
  title,
  message,
  duration,
}: INotification) => {
  const notifWrapper = document.querySelector(".app-notif");
  notifWrapper && notifWrapper.classList.add("active");

  Store.addNotification({
    title,
    message: message || "",
    type,
    insert: "top",
    container: "top-center",
    width: 450,
    dismiss: {
      duration: duration || 5000,
      // showIcon: true,
    },
    slidingExit: {
      duration: 300,
      timingFunction: "ease-out",
      delay: 0,
    },
    onRemoval: (id, removedBy) => {
      notifWrapper && notifWrapper.classList.remove("active");
    },
  });
};

export const addAuthNotification = () =>
  addNotification({
    title: "Authorization",
    message: "To perform this action, please register",
    type: "info",
  });

export const addAuthWalletNotification = (wallet: string) =>
  addNotification({
    title: `Authorization - You need to log in to your wallet ${wallet}`,
    type: "warning",
  });

export const addErrorNotification = ({
  message,
  title,
  duration,
}: INotificationWithoutType) =>
  addNotification({
    title,
    message: message || "",
    type: "danger",
    duration: duration || 2500,
  });

export const addSuccessNotification = ({
  message,
  title,
}: INotificationWithoutType) => {
  addNotification({
    title,
    message: message || "",
    type: "success",
    duration: 1500,
  });
};

export const addNotValidForm = () =>
  addErrorNotification({
    title: "Not all fields are filled",
  });

export const addInvalidAddress = () =>
  addErrorNotification({
    title: "Invalid address provided",
  });
export const addInstallWalletNotification = (
  walletName: string,
  installUrl: string
) => {
  addNotification({
    type: "warning",
    title: `You don't have the ${walletName} wallet extension installed`,
    message: (
      <a
        href={installUrl}
        target="_blank"
        className="auth-modal__link"
        rel="noreferrer"
      >
        Install {walletName}
      </a>
    ),
  });
};
