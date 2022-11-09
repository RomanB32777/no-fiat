import axios from "axios";
import { Web3Storage } from "web3.storage";

const makeStorageClient = () => {
  return new Web3Storage({ token: process.env.REACT_APP_STORAGE_TOKEN || "" });
};

const createJSON = (_uri: string) => {
  const dict = { URI: _uri };
  const jsonDict = JSON.stringify(dict);
  const file = new File([jsonDict], "metadata.json", {
    type: "text/plain;charset=utf-8",
  });
  return file;
};

const storeFiles = async (file: File) => {
  const client = makeStorageClient();
  const cid = await client.put([file]);
  console.log("stored files with cid:", cid);
  const ipfsLink = "ipfs://" + cid;
  console.log(ipfsLink);
  return ipfsLink;
};

const uploadToIpfs = async (photoValue: FileList) => {
  const file = photoValue[0];
  const sendFile = new File([file], file.name, { type: file.type });
  const _uri = await storeFiles(sendFile);
  const badgeDict = createJSON(_uri);
  const new_uri = await storeFiles(badgeDict);
  return new_uri;
};

const getFromIpfs = async (photoLink: string, cb?: (res: string) => void) => {
  const rootCid = photoLink.split("//")[1];
  const dataJSON = await axios.get(
    `https://${rootCid}.ipfs.w3s.link/metadata.json`
  );

  if (dataJSON.status === 200) {
    const client = makeStorageClient();
    const imgCid = dataJSON.data.URI.split("//")[1];
    const res = await client.get(imgCid);

    if (res) {
      const files = await res.files();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = ({ target }) => {
          target && resolve(target.result);
          target && cb && cb((target.result as string) || "");
        };
        reader.onerror = reject;
      });
    }
  }
};

export { makeStorageClient, uploadToIpfs, getFromIpfs };
