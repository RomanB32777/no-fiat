import { Web3Storage } from "web3.storage";

const filename = "employee";
const fileformat = "jpg";

const makeStorageClient = () => {
  return new Web3Storage({ token: process.env.REACT_APP_STORAGE_TOKEN || "" });
};

const storeFiles = async (file: File) => {
  const client = makeStorageClient();
  const cid = await client.put([file], { name: filename });
  console.log("stored files with cid:", cid);
  const ipfsLink = "ipfs://" + cid;
  return ipfsLink;
};

const uploadToIpfs = async (photoValue: FileList) => {
  try {
    const file = photoValue[0];
    const sendFile = new File([file], `${filename}.${fileformat}`, {
      type: file.type,
    });
    const _uri = await storeFiles(sendFile);
    return _uri;
  } catch (error) {
    console.log((error as Error).message || error);
    // addErrorNotification({
    //   title: (error as Error).message || "Processing error. Try again!",
    // });
  }
};

const getFromIpfs = (photoLink: string) => {
  const rootCid = photoLink.split("//")[1];
  return `https://${rootCid}.ipfs.w3s.link/${filename}.jpg`;
};

// , cb?: (res: string) => void

// const client = makeStorageClient();
// const res = await client.get(rootCid);

// if (res) {
//   const files = await res.files();
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(files[0]);
//     reader.onload = ({ target }) => {
//       target && resolve(target.result);
//       target && cb && cb((target.result as string) || "");
//     };
//     reader.onerror = reject;
//   });
// }

export { makeStorageClient, uploadToIpfs, getFromIpfs };
