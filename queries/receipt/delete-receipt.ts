import { gql } from '@apollo/client';

export const DELETE_RECEIPT = gql`
  mutation DeleteReceipt($deleteReceiptId: String!) {
    deletedReceipt: deleteReceipt(id: $deleteReceiptId) {
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
