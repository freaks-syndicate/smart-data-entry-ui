import * as React from 'react';

import ReceiptViewTemplate from '@/components/templates/receipts/view';

export interface IReceiptsViewPageProps {}

export default function ReceiptsViewPage(_props: IReceiptsViewPageProps) {
  return (
    <div>
      <ReceiptViewTemplate />
    </div>
  );
}
