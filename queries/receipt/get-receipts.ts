import { gql } from '@apollo/client';

export const GET_RECEIPTS = gql`
  query Receipts($where: WhereOptionsReceipt, $paginate: PaginationInput) {
    receipts: Receipts(where: $where, paginate: $paginate) {
      pageInfo {
        perPage
        currentPage
        hasPreviousPage
        hasNextPage
        itemCount
        pageCount
        pageItemCount
      }
      results {
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
