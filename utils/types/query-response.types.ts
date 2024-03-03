import { IReceiptModel, IUserInfo } from './be-model-types';

export interface InputGetReceiptsAllResponse {
  receipts: IReceiptModel[];
}

export interface IGetUserInfoResponse {
  user: IUserInfo;
}
