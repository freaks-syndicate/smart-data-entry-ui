import { gql } from '@apollo/client';

export const GET_RECEIPTS_ALL = gql`
  query ReceiptsAll {
    receipts: ReceiptsAll {
      id
      uuid
      receiptNumber
      year
      date
      mobileNumber
      name
      address
      amount
      aadharNumber
      panNumber
    }
  }
`;
