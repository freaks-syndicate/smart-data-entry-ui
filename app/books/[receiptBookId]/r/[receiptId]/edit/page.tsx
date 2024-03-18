import { client } from '@/apollo/client.mjs';
import ReceiptsEditTemplate from '@/components/templates/receipt-books/receipts/edit';
import { GET_RECEIPT } from '@/queries/receipt/get-receipt';
import { IGetReceiptSingleArgs, IGetReceiptSingleResponse } from '@/utils/types/query-response.types';

export interface IReceiptEditPageProps {
  params: {
    receiptBookId: string;
    receiptId: string;
  };
}

export default async function ReceiptEditPage(props: IReceiptEditPageProps) {
  const {
    params: { receiptBookId, receiptId },
  } = props;

  const receiptResponse = await client.query<IGetReceiptSingleResponse, IGetReceiptSingleArgs>({
    query: GET_RECEIPT,
    variables: { where: { id: receiptId } },
  });

  return (
    <div>
      <ReceiptsEditTemplate receiptBookId={receiptBookId} receipt={receiptResponse.data.receipt} />
    </div>
  );
}
