import { client } from '@/apollo/client.mjs';
import ReceiptBookDetailsTemplate from '@/components/templates/receipt-books/details';
import { GET_RECEIPT_BOOK } from '@/queries/receipt-book/get-receipt-book';
import { ClientReceiptBook } from '@/utils/types';
import { ReceiptBookQuery, ReceiptBookQueryVariables } from '@/utils/types/generated/graphql';

export interface IReceiptBookDetailsPageProps {
  params: { receiptBookId: string };
}

export default async function ReceiptBookDetailsPage(props: IReceiptBookDetailsPageProps) {
  const {
    params: { receiptBookId },
  } = props;

  const receiptBookResponse = await client.query<ReceiptBookQuery, ReceiptBookQueryVariables>({
    query: GET_RECEIPT_BOOK,
    variables: { where: { id: receiptBookId } },
  });

  const receiptBook = receiptBookResponse?.data?.receiptBook;

  if (!receiptBook) {
    console.error('Receipt book not found');
    return null;
  }

  return (
    <div>
      <ReceiptBookDetailsTemplate receiptBook={receiptBook as ClientReceiptBook} />
    </div>
  );
}
