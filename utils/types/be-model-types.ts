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
  cash,
  cheque,
  online,
}

export interface IReceiptModel {
  id: string;
  uuid: string;
  receiptNumber: number;
  financialYear?: number;
  date?: string;
  mobileNumber?: number;
  name: string;
  address?: string;
  amount: number;
  aadharNumber?: number;
  panNumber?: string;
  modeOfPayment: ModeOfPayment;
}

// CreateReceipt FormData
export interface IFormData {
  reciptNumber: number;
  email: string;
  name: string;
  financialYear: number;
  date: Date;
  mobileNumber: number | null;
  address: string;
  amount: number;
  aadharNumber: number | null;
  panNumber: string;
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
