import {
  NotificationTitleMessage,
  NOTIFICATION_TYPE,
  Store,
} from "react-notifications-component";
// import postData from "./functions/postData";

interface INotification {
  type: NOTIFICATION_TYPE;
  title: string;
  message?: NotificationTitleMessage;
  duration?: number;
}

export const addNotification = ({
  type,
  title,
  message,
  duration,
}: INotification) => {
  Store.addNotification({
    title,
    message: message || "",
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: duration || 5000,
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

export const addSuccessNotification = (message: string) =>
  addNotification({
    title: "Success",
    message,
    type: "success",
    duration: 3000,
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

export const getRandomStr = (length: number) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const shortStr = (str: string, length: number) => {
  return str.length > 30
    ? str.slice(0, 6) + "..." + str.slice(str.length - length)
    : str;
};

export const copyStr = (str: string) => {
  try {
    navigator.clipboard.writeText(str);
    addNotification({
      type: "success",
      title: "Link successfully copied",
    });
  } catch (error) {
    addNotification({
      type: "danger",
      title: "An error occurred while copying the link",
    });
  }
};

export const isInstallTronWallet = () =>
  (window as any).hasOwnProperty("tronWeb");
