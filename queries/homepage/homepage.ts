import { gql } from "@apollo/client";

export const GET_RECEIPTS_LIST = gql`
  query Receipts {
    Receipts {
      results {
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
      pageInfo {
        currentPage
        perPage
        itemCount
        pageItemCount
        pageCount
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;
