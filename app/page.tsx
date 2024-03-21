import { client } from '@/apollo/client.mjs';
import ReceiptBooksTemplate from '@/components/templates/receipt-books';
import { ReceiptBook, ReceiptBooksDocument, ReceiptBooksQueryResult, ReceiptBooksQueryVariables } from '@/utils/types/generated/graphql';

export default async function HomePage() {
  const receiptBooksResponse = await client.query<ReceiptBooksQueryResult, ReceiptBooksQueryVariables>({
    query: ReceiptBooksDocument,
  });

  const receiptBooks = receiptBooksResponse.data.data?.receiptBooks?.results?.filter((book): book is ReceiptBook => book !== null) ?? [];

  if (receiptBooks.length <= 0) {
    console.error('[+] No Receipt Books Found');
    return null;
  }

  return (
    <div>
      <ReceiptBooksTemplate receiptBooks={receiptBooks} />
    </div>
  );
}
