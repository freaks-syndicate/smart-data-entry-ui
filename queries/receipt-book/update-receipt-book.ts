import { gql } from '@apollo/client';

export const UPDATE_RECEIPT_BOOK = gql`
  mutation UpdateReceiptBook($updateReceiptBookId: String!, $item: UpdateReceiptBook!) {
    updatedReceiptBook: updateReceiptBook(id: $updateReceiptBookId, item: $item) {
      id
      uuid
      receiptBookNumber
      receiptSeries
      totalReceipts
      financialYear
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
        cancelled
      }
      usedReceipts
    }
  }
`;
