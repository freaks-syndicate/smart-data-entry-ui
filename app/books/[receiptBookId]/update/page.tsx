'use client';
import UpdateReceiptBookTemplate from '@/components/templates/receipt-books/update';
import { useReceiptBookQuery } from '@/utils/types/generated/graphql';

export interface IUpdateReceiptBookPageProps {
  params: {
    receiptBookId: string;
  };
}

export default function UpdateReceiptBookPage(props: IUpdateReceiptBookPageProps) {
  const {
    params: { receiptBookId },
  } = props;

  const {
    data: receiptBookResponse,
    loading,
    error,
  } = useReceiptBookQuery({
    variables: {
      where: { id: receiptBookId },
    },
  });

  const receiptBook = receiptBookResponse?.receiptBook;

  if (loading) {
    // TODO: Gracefully handle loading
    return <p>loading...</p>;
  }

  if (error || !receiptBook) {
    // TODO: Gracefully handle error
    console.error('error: ', error);
    console.error('Receipt book not found');
    return null;
  }

  return (
    <div>
      <UpdateReceiptBookTemplate receiptBook={receiptBook} />
    </div>
  );
}
