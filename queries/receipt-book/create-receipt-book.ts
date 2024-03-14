import { gql } from '@apollo/client';

export const CREATE_RECEIPT_BOOK = gql`
  mutation CreateReceiptBook($item: CreateReceiptBook!) {
    createdReceipt: createReceiptBook(item: $item) {
      id
      uuid
      receiptBookNumber
      receiptSeries
      totalReceipts
      financialYear
      usedReceipts
      receipts {
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
  }
`;
