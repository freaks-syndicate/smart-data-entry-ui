import { IReceiptBookModel, IReceiptModel, IUserInfo, ModeOfPayment } from './be-model-types';

// Page Related
export interface IPageInfo {
  hasNextPage?: boolean;
  currentPage?: number;
  hasPreviousPage?: boolean;
  itemCount?: number;
  pageCount?: number;
  pageItemCount?: number;
  perPage?: number;
}

// ReceiptBooks
export interface IGetReceiptBooksResponse {
  receiptBooks: {
    results: IReceiptBookModel[];
    pageInfo?: IPageInfo;
  };
}

export interface ICreateReceiptBookArgs {
  item: {
    financialYear?: string;
    receiptBookNumber: number;
    receiptSeries: number;
    totalReceipts: number;
  };
}

export interface IUpdateReceiptBookArgs {
  id: string;
  item: {
    financialYear?: string;
    receiptBookNumber?: number;
    receiptSeries?: number;
    totalReceipts?: number;
  };
}

export interface IDeleteReceiptBookArgs {
  id: string;
}

// Receipts
export interface IGetReceiptsAllResponse {
  receipts: IReceiptModel[];
}

export interface ICreateReceiptArgs {
  item: {
    aadharNumber?: number;
    address?: string;
    amount: number;
    date?: string;
    financialYear?: number;
    mobileNumber?: number;
    modeOfPayment: ModeOfPayment;
    name: string;
    panNumber?: string;
    receiptBookId: string;
    receiptNumber: number;
  };
}

export interface IUpdateReceiptArgs {
  id: string;
  item: {
    aadharNumber?: number;
    address?: string;
    amount?: number;
    date?: string;
    financialYear?: number;
    mobileNumber?: number;
    modeOfPayment?: ModeOfPayment;
    name?: string;
    panNumber?: string;
    receiptBookId?: string;
    receiptNumber?: number;
  };
}

export interface IDeleteReceiptArgs {
  id: string;
}

// User
export interface IGetUserInfoResponse {
  user: IUserInfo;
}
