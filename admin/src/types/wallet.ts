import {
  IEmployee,
  IEmployeeBase,
  IEmployeeInTeam,
  IOrganization,
  ITeam,
} from "./organization";

export interface IWalletInitData {
  userAddress: string | null;
}

export interface ITipRecieverObj {
  inOrganization: boolean;
  ownerAddress: string;
}

export interface ICreateOrganization {
  percentages: number;
  name: string;
}

export interface ITipsObj {
  ownerAddress: string;
  employeeAddress: string;
  review: string;
  amount: string;
}

export interface IChangePhotoObj {
  newPhoto: string;
  address: string;
}

export interface IFormatAddressStr {
  address: string;
  format: string;
}

export interface IBlockchain {
  address: string;
  name: string;
  icon: string;
  chainName: string;
  nativeCurrency: {
    symbol: string;
    name: string;
    decimals?: number;
  };
}

export interface IWalletState {
  address: string;
  // name: string;
  chainName: string;
  nativeCurrency: {
    symbol: string;
    name: string;
    decimals?: number;
  };
  icon: string;
  abi?: any[];
  bytecode?: string;
  connectionConfig?: {
    networkId: string;
    keyStore: any;
    nodeUrl: string;
    walletUrl: string;
    helperUrl: string;
    explorerUrl: string;
  };
}

export interface IWalletAction {
  type: string;
  payload: IWalletState;
}

export interface IWalletMethods {
  // contract
  formatNumber: (from: any) => number;
  formatBignumber: (from: any) => any;
  formatAddressStr: (formatObj: IFormatAddressStr) => string;
  getBlockchainContractData: () => Promise<any>; // !
  isValidAddress: (address: string) => boolean;

  // user
  getWalletUserData: () => Promise<IWalletInitData>; // !
  checkIfOwner: () => Promise<boolean>;
  checkIfTipReciever: (address?: string) => Promise<ITipRecieverObj | boolean>;
  checkIsTeamMember: (address?: string) => Promise<IEmployeeInTeam>;
  getBalance: () => Promise<number>;

  // organization
  addOrganization: (
    objForCreateOrganization: ICreateOrganization
  ) => Promise<any>;
  showOrganization: (ownerAddress?: string) => Promise<IOrganization>;

  // team
  addTeamToOrg: (team: ITeam) => Promise<any>;
  deleteTeamFromOrg: (organizationName: string) => Promise<any>;
  changeTeamName: (oldName: string, newName: string) => Promise<any>;
  changeTeamPercentage: (
    teamName: string,
    newPercentageToPay: number
  ) => Promise<any>;
  addEmployeeToTeam: (
    teamName: string,
    employeeAddress: string
  ) => Promise<any>;
  removeEmpoloyeeFromTeam: (
    teamName: string,
    employeeAddress: string
  ) => Promise<any>;

  // employee
  addEmployeeToOrg: (employee: IEmployeeBase) => Promise<any>;
  getEmployeeInfo: (employeeAddress: string) => Promise<IEmployee>;
  getEmployeeBase: (employeeAddress: string) => Promise<IEmployeeBase>;
  getEmployeePhoto: (employeeAddress: string) => Promise<any>;
  changeEmployeePhoto: (changePhotoObj: IChangePhotoObj) => Promise<any>;
  editEmployeeInOrg: (employee: IEmployeeBase) => Promise<any>;
  removeEmployeeFromOrg: (employeeAddress: string) => Promise<any>;

  // tips
  sendTips: (forSendTipsObj: ITipsObj) => Promise<any>;
  withdrawTeams: () => Promise<any>;
  withdrawTipsByEmployee: () => Promise<any>;
}

export interface IWalletConf extends IWalletState, IWalletMethods {}

export type blockchainsType = "tronlink" | "near";

export type currencyBlockchainsType = {
  [key in blockchainsType]: string;
};
export interface IWalletsConf {
  [wallet: string]: IWalletConf;
}
