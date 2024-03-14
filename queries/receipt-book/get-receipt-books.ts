import { gql } from '@apollo/client';

export const GET_RECEIPT_BOOKS = gql`
  query ReceiptBooks($paginate: PaginationInput, $where: WhereOptionsReceiptBook) {
    receiptBooks: ReceiptBooks(paginate: $paginate, where: $where) {
      results {
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
        }
        usedReceipts
      }
      pageInfo {
        hasNextPage
        currentPage
        hasPreviousPage
        itemCount
        pageCount
        pageItemCount
        perPage
      }
    }
  }
`;
