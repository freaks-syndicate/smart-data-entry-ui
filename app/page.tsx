'use client';
import ReceiptBooksTemplate from '@/components/templates/receipt-books';
import { ReceiptBook, useReceiptBooksQuery } from '@/utils/types/generated/graphql';

export default function HomePage() {
  const {
    data: receiptBooksResponse,
    loading,
    error,
  } = useReceiptBooksQuery({
    variables: {
      paginate: { page: 0, pageSize: 10 },
    },
  });

  // TODO: Gracefully handle errors and loading
  if (loading) return <p>Loading ...</p>;
  if (error) {
    console.error(error);
    return null;
  }

  const receiptBooks = receiptBooksResponse?.receiptBooks?.results?.filter((book): book is ReceiptBook => book !== null) ?? [];

  return (
    <div>
      <ReceiptBooksTemplate receiptBooks={receiptBooks} />
    </div>
  );
}
