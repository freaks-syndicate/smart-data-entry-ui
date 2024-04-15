import { gql } from '@apollo/client';

export const DELETE_RECEIPT_BOOK = gql`
  mutation DeleteReceiptBook($deleteReceiptBookId: String!) {
    deletedReceiptBook: deleteReceiptBook(id: $deleteReceiptBookId) {
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
