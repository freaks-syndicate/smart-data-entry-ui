import { gql } from '@apollo/client';

export const GET_RECEIPT = gql`
  query Receipt($where: WhereOptionsReceipt) {
    receipt: Receipt(where: $where) {
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
  }
`;
