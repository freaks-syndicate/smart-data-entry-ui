import { IReceiptBookModel, IReceiptModel, IUserInfo } from './be-model-types';

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

// Receipts
export interface IGetReceiptsAllResponse {
  receipts: IReceiptModel[];
}

// User
export interface IGetUserInfoResponse {
  user: IUserInfo;
}
