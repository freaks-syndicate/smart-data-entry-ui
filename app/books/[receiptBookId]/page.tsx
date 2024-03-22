'use client';
import ReceiptBookDetailsTemplate from '@/components/templates/receipt-books/details';
import { ClientReceiptBook } from '@/utils/types';
import { useReceiptBookQuery } from '@/utils/types/generated/graphql';

export interface IReceiptBookDetailsPageProps {
  params: { receiptBookId: string };
}

export default function ReceiptBookDetailsPage(props: IReceiptBookDetailsPageProps) {
  const {
    params: { receiptBookId },
  } = props;

  // const receiptBookResponse = await client.query<ReceiptBookQuery, ReceiptBookQueryVariables>({
  //   query: GET_RECEIPT_BOOK,
  //   variables: { where: { id: receiptBookId } },
  // });
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
      <ReceiptBookDetailsTemplate receiptBook={receiptBook as ClientReceiptBook} />
    </div>
  );
}
