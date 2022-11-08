import { Store } from "react-notifications-component";
import {
  INotification,
  INotificationWithoutType,
} from "./types";

export const addNotification = ({ type, title, message }: INotification) => {
  Store.addNotification({
    title,
    message: message || "",
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
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
    title: "Authorization",
    message: `You need to log in to your wallet ${wallet}`,
    type: "warning",
  });

export const addErrorNotification = ({
  message,
  title,
}: INotificationWithoutType) =>
  addNotification({
    title: title || "Error",
    message,
    type: "danger",
  });

export const addSuccessNotification = ({
  message,
  title,
}: INotificationWithoutType) =>
  addNotification({
    title: title || "Success",
    message,
    type: "success",
  });

export const addNotFoundUserNotification = () =>
  addNotification({
    type: "danger",
    title: "User with this username not found!",
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
        style={{
          color: "#fff",
          textDecoration: "underline",
        }}
      >
        Install {walletName}
      </a>
    ),
  });
};
