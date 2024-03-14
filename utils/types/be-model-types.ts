export interface IReceiptBookModel {
  financialYear?: string;
  receiptBookNumber: number;
  receiptSeries: number;
  receipts?: IReceiptModel[];
  totalReceipts: number;
  usedReceipts: number;
  uuid: string;
}

export interface IReceiptModel {
  uuid: string;
  receiptNumber: number;
  year?: number;
  date?: string;
  mobileNumber?: number;
  name: string;
  address?: string;
  amount: number;
  aadharNumber?: number;
  panNumber?: string;
}

// CreateReceipt FormData
export interface IFormData {
  reciptNumber: number;
  email: string;
  name: string;
  year: number;
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
