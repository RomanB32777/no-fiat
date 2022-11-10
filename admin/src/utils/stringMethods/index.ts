import { Buffer } from "buffer";
import { addSuccessNotification } from "../notifications";

const getRandomStr = (length: number) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const shortStr = (str: string, length: number) => {
  return str.length > 30
    ? str.slice(0, 6) + "..." + str.slice(str.length - length)
    : str;
};

const copyStr = (str: string) => {
  try {
    navigator.clipboard.writeText(str);
    addSuccessNotification({
      title: "Link successfully copied",
    });
  } catch (error) {
    addSuccessNotification({
      title: "An error occurred while copying the link",
    });
  }
};

const fromHexToString = (strHex: string) => {
  const bufferFormat = Buffer.from(strHex, "hex");
  if (bufferFormat) return bufferFormat.toString("utf8");
  else return strHex;
};

export { getRandomStr, shortStr, copyStr, fromHexToString };
