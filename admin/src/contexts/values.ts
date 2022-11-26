import { nearMethods, tronlinkMethods } from "../utils";
import { IWalletConf, IWalletContext } from "../types";
import {
  initEmployee,
  initEmployeeBase,
  initEmployeeInTeam,
  initialNearState,
  initialTronlinkState,
  initOrganization,
} from "../consts";

export const initValue: IWalletContext = {
  walletsConf: {},
  currentWalletConf: {
    address: "",
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
    checkIsExistEmployee: async () => false,

    // tips
    sendTips: async () => {},
    withdrawTeams: async () => {},
    withdrawTipsByEmployee: async () => {},
  },
  currentWalletName: "tronlink",
};

export const tronConf: IWalletConf = {
  ...initialTronlinkState,
  ...tronlinkMethods,
};

export const nearConf: IWalletConf = {
  ...initialNearState,
  ...nearMethods,
};
