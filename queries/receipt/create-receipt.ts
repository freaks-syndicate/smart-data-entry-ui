import { gql } from '@apollo/client';

export const CREATE_RECEIPT = gql`
  mutation CreateReceipt($item: CreateReceipt!) {
    createdReceipt: createReceipt(item: $item) {
      id
      uuid
      receiptNumber
      financialYear
      date
      mobileNumber
      name
      address
      amount
      modeOfPayment
      aadharNumber
      panNumber
      idCode
    }
  }
`;
