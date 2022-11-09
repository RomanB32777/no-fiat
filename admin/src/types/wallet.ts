import { IEmployee, IEmployeeBase, IOrganization, ITeam } from "./organization";

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

// old
export interface IBalanceObj {
  walletData: any;
  setBalance?: (amount: number) => void;
}
//

export interface IBlockchain {
  address: string;
  name: string;
  icon: string;
  chainId?: string;
  chainName: string;
  badgeName: string;
  nativeCurrency: {
    symbol: string;
    name: string;
    decimals?: number;
  };
  rpcUrls?: string[];
  blockExplorerUrls?: string[];
}

export interface IWalletState {
  blockchains: IBlockchain[];
  icon: string;
  abi?: any[];
  bytecode: string;
}

export interface IWalletAction {
  type: string;
  payload: IWalletState;
}

export interface IWalletMethods {
  // contract
  formatNumber: (from: any) => any; // number
  formatAddressStr: (formatObj: IFormatAddressStr) => string;
  getBlockchainContractData: () => Promise<any>;

  // user
  getWalletUserData: () => Promise<IWalletInitData>;
  checkIfOwner: () => Promise<boolean>;
  checkIfTipReciever: () => Promise<ITipRecieverObj | boolean>;

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

  // old
  getBalance: (objForBalance: IBalanceObj) => Promise<number>;
}

export interface IWalletConf extends IWalletState, IWalletMethods {}

export interface IWalletsConf {
  [wallet: string]: IWalletConf;
}
