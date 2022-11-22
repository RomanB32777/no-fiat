import { createContext } from "react";
import { blockchainsType, IWalletConf, IWalletsConf } from "../types";
import { tronlinkMethods, nearMethods } from "../utils"; // !!!
// import { getNearUserWallet } from "../utils/wallets/near/contractMethods";
import {
  initEmployee,
  initEmployeeBase,
  initEmployeeInTeam,
  initOrganization,
  initialTronlinkState,
  initialNearState,
} from "../consts";

export interface IWalletContext {
  walletsConf: IWalletsConf;
  currentWalletConf: IWalletConf;
  currentWalletName: blockchainsType;
}

const initValue: IWalletContext = {
  walletsConf: {},
  currentWalletConf: {
    address: "",
    name: "",
    chainName: "",
    nativeCurrency: {
      name: "",
      symbol: "",
    },
    icon: "",
    bytecode: "",

    // contract
    formatNumber: () => 0,
    formatBignumber: () => 0,
    formatAddressStr: () => "",
    getBlockchainContractData: async () => {},
    isValidAddress: () => false,

    // // user
    getWalletUserData: async () => ({
      userAddress: "",
    }),
    checkIfOwner: async () => false,
    checkIfTipReciever: async () => false,
    checkIsTeamMember: async () => initEmployeeInTeam,
    getBalance: async () => 0,

    // organization
    addOrganization: async () => {},
    showOrganization: async () => initOrganization,

    // team
    addTeamToOrg: async () => {},
    deleteTeamFromOrg: async () => {},
    changeTeamName: async () => {},
    changeTeamPercentage: async () => {},
    addEmployeeToTeam: async () => {},
    removeEmpoloyeeFromTeam: async () => {},

    // employee
    addEmployeeToOrg: async () => {},
    getEmployeeInfo: async () => initEmployee,
    getEmployeeBase: async () => initEmployeeBase,
    getEmployeePhoto: async () => {},
    changeEmployeePhoto: async () => {},
    editEmployeeInOrg: async () => {},
    removeEmployeeFromOrg: async () => {},

    // tips
    sendTips: async () => {},
    withdrawTeams: async () => {},
    withdrawTipsByEmployee: async () => {},
  },
  currentWalletName: "tronlink",
};

const walletsConf: IWalletsConf = {
  tronlink: { ...initialTronlinkState, ...tronlinkMethods },
  near: {
    ...initialNearState,
    ...nearMethods,
    // getWalletUserData() {
    //   return getNearUserWallet(this);
    // },
  },
};

const currentWalletName = process.env.REACT_APP_WALLET || "tronlink";
const currentWalletConf = walletsConf[currentWalletName];

export const contextValue: IWalletContext = {
  walletsConf,
  currentWalletConf,
  currentWalletName: currentWalletName as blockchainsType,
};

export const WalletContext = createContext<IWalletContext>(initValue);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
