import { IReceiptBookModel, IReceiptModel, IUserInfo, ModeOfPayment } from '@/utils/types/be-model-types';

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

export interface ICreateReceiptBookResponse {
  createdReceiptBook: IReceiptBookModel;
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

export interface IUpdateReceiptBookResponse {
  updatedReceiptBook: IReceiptBookModel;
}

export interface IDeleteReceiptBookArgs {
  id: string;
}

export interface IDeleteReceiptBookResponse {
  deletedReceiptBook: IReceiptBookModel;
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

export interface ICreateReceiptResponse {
  createdReceipt: IReceiptModel;
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

export interface IUpdateReceiptResponse {
  updatedReceipt: IReceiptModel;
}

export interface IDeleteReceiptArgs {
  id: string;
}

export interface IDeleteReceiptResponse {
  deletedReceipt: IReceiptModel;
}

// User
export interface IGetUserInfoResponse {
  user: IUserInfo;
}
