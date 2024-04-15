import { gql } from '@apollo/client';

export const GET_RECEIPT_BOOK = gql`
  query ReceiptBook($where: WhereOptionsReceiptBook) {
    receiptBook: ReceiptBook(where: $where) {
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
