import { client } from '@/apollo/client.mjs';
import UpdateReceiptBookTemplate from '@/components/templates/receipt-books/update';
import { GET_RECEIPT_BOOK } from '@/queries/receipt-book/get-receipt-book';
import { IGetReceiptBookSingleArgs, IGetReceiptBookSingleResponse } from '@/utils/types/query-response.types';

export interface IUpdateReceiptBookPageProps {
  params: {
    receiptBookId: string;
  };
}

export default async function UpdateReceiptBookPage(props: IUpdateReceiptBookPageProps) {
  const {
    params: { receiptBookId },
  } = props;

  const receiptBookResponse = await client.query<IGetReceiptBookSingleResponse, IGetReceiptBookSingleArgs>({
    query: GET_RECEIPT_BOOK,
    variables: { where: { id: receiptBookId } },
  });

  return (
    <div>
      <UpdateReceiptBookTemplate receiptBook={receiptBookResponse.data.receiptBook} />
    </div>
  );
}
