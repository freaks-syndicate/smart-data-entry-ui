import { ApolloQueryResult } from '@apollo/client';

import { client } from '@/apollo/client.mjs';
import ReceiptBooksTemplate from '@/components/templates/receipt-books';
import { GET_RECEIPT_BOOKS } from '@/queries/receipt-book/get-receipt-books';
import { IGetReceiptBooksResponse } from '@/utils/types/query-response.types';

export default async function HomePage() {
  const data: ApolloQueryResult<IGetReceiptBooksResponse> = await client.query({
    query: GET_RECEIPT_BOOKS,
  });

  const receiptBooks = data?.data?.receiptBooks.results ?? [];

  return (
    <div>
      <ReceiptBooksTemplate receiptBooks={receiptBooks} />
    </div>
  );
}
