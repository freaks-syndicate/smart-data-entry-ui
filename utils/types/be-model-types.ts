export interface IReceiptBookModel {
  id: string;
  financialYear?: string;
  receiptBookNumber: number;
  receiptSeries: number;
  receipts?: IReceiptModel[];
  totalReceipts: number;
  usedReceipts: number;
  uuid: string;
}

export enum ModeOfPayment {
  cash = 'cash',
  cheque = 'cheque',
  online = 'online',
}

export interface IReceiptModel {
  id: string;
  uuid: string;
  receiptNumber: number;
  financialYear?: string;
  date?: string;
  mobileNumber?: number;
  name: string;
  address?: string;
  amount: number;
  aadharNumber?: number;
  panNumber?: string;
  modeOfPayment: ModeOfPayment;
}

export interface IUserInfo {
  userId: string;
  firstName?: string;
  lastName?: string;
  roles?: IUserRole[];
}

export interface IUserRole {
  name: string;
  permissions: string[];
}
