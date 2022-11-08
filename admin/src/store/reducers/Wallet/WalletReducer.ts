import { SET_MAIN_WALLET } from "../../types/Wallet";

const initialState = {}

//: IWalletState =
//  walletsState[process.env.REACT_APP_WALLET || "tronlink"];

const WalletReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MAIN_WALLET:
      return action.payload;

    default:
      return state;
  }
};

export default WalletReducer;