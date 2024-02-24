'use client';
import * as React from 'react';

import ReceiptsEditTemplate from '@/components/templates/receipts/edit';

export interface IReceiptEditPageProps {}

export default function ReceiptEditPage(_props: IReceiptEditPageProps) {
  return (
    <div>
      <ReceiptsEditTemplate />
    </div>
  );
}
