import axios from "axios";
import { tronlinkMethods } from "./tronlink";
import { nearMethods } from "./near";

const getUsdKoef = async (
  blockchain: string, // currencyTypes
  setUsdtKoef?: (price: number) => void
) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${blockchain}&vs_currencies=usd`
  );

  setUsdtKoef && data[blockchain] && setUsdtKoef(+data[blockchain].usd);
  if (data[blockchain]) return +data[blockchain].usd;
  return 0;
};

export { tronlinkMethods, nearMethods, getUsdKoef };
