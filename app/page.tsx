import { client } from '@/apollo/client.mjs';
import ReceiptBooksTemplate from '@/components/templates/receipt-books';
import { ReceiptBook, ReceiptBooksDocument, ReceiptBooksQuery, ReceiptBooksQueryVariables } from '@/utils/types/generated/graphql';

export default async function HomePage() {
  const receiptBooksResponse = await client.query<ReceiptBooksQuery, ReceiptBooksQueryVariables>({
    query: ReceiptBooksDocument,
    variables: {
      paginate: { page: 0, pageSize: 10 },
    },
  });

  const receiptBooks = receiptBooksResponse.data?.receiptBooks?.results?.filter((book): book is ReceiptBook => book !== null) ?? [];

  return (
    <div>
      <ReceiptBooksTemplate receiptBooks={receiptBooks} />
    </div>
  );
}
