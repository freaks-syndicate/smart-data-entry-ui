import { client } from '@/apollo/client.mjs';
import ReceiptBookDetailsTemplate from '@/components/templates/receipt-books/details';
import { GET_RECEIPT_BOOK } from '@/queries/receipt-book/get-receipt-book';
import { IGetReceiptBookSingleArgs, IGetReceiptBookSingleResponse } from '@/utils/types/query-response.types';

export interface IReceiptBookDetailsPageProps {
  params: { receiptBookNumber: string };
}

export default async function ReceiptBookDetailsPage(props: IReceiptBookDetailsPageProps) {
  const {
    params: { receiptBookNumber },
  } = props;

  const receiptBookResponse = await client.query<IGetReceiptBookSingleResponse, IGetReceiptBookSingleArgs>({
    query: GET_RECEIPT_BOOK,
    variables: { where: { receiptBookNumber: { eq: +receiptBookNumber } } },
  });

  const receiptBook = receiptBookResponse?.data?.receiptBook;

  return (
    <div>
      <ReceiptBookDetailsTemplate receiptBook={receiptBook} />
    </div>
  );
}
