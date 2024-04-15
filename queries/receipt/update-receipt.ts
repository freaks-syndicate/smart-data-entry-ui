import { gql } from '@apollo/client';

export const UPDATE_RECEIPT = gql`
  mutation UpdateReceipt($updateReceiptId: String!, $item: UpdateReceipt!) {
    updatedReceipt: updateReceipt(id: $updateReceiptId, item: $item) {
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
      receiptBook {
        id
      }
    }
  }
`;
