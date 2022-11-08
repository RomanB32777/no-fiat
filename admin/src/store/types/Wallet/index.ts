export const GET_WALLET = "GET_WALLET";
export const SET_WALLET = "SET_WALLET";
export const SET_MAIN_WALLET = "SET_MAIN_WALLET";

export const getWallet = () => ({
  type: GET_WALLET,
});

export const setWallet = (payload: any) => {
  return { type: SET_WALLET, payload };
};

export const setMainWallet = (payload: any) => {
  localStorage.setItem("main_wallet", JSON.stringify(payload));
  return { type: SET_MAIN_WALLET, payload };
};
