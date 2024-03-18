'use client';
import { Heading } from '@chakra-ui/react';
import cx from 'classnames';
import { useState } from 'react';

import CustomSessionAuth from '@/components/auth/custom-session-auth';
import UpdateReceiptForm from '@/components/books/receipts/update-receipt-form';
import { IReceiptModel } from '@/utils/types/be-model-types';
import { IUpdateReceiptArgs } from '@/utils/types/query-response.types';

import styles from './receipt-edit-template.module.scss';

export interface IReceiptsEditTemplateProps {
  receiptBookId: string;
  receipt: IReceiptModel;
}

export default function ReceiptsEditTemplate(props: IReceiptsEditTemplateProps) {
  const { receipt, receiptBookId } = props;

  const INITIAL_RECEIPT_BOOK_FORM_DATA: IUpdateReceiptArgs['item'] = {
    aadharNumber: receipt.aadharNumber,
    address: receipt.address,
    amount: receipt.amount,
    date: receipt.date,
    financialYear: receipt.financialYear,
    mobileNumber: receipt.mobileNumber,
    modeOfPayment: receipt.modeOfPayment,
    name: receipt.name,
    panNumber: receipt.panNumber,
    receiptBookId: receiptBookId,
    receiptNumber: receipt.receiptNumber,
  };

  const [receiptFormData, setReceiptFormData] = useState<IUpdateReceiptArgs['item']>(INITIAL_RECEIPT_BOOK_FORM_DATA);

  const reset = () => setReceiptFormData(INITIAL_RECEIPT_BOOK_FORM_DATA);

  return (
    <CustomSessionAuth>
      <div className={cx(styles['d-container'])}>
        {/* Heading */}
        <Heading textAlign={'center'}>Update Receipt: {receipt.receiptNumber}</Heading>

        {/* Form */}
        <UpdateReceiptForm receiptFormData={receiptFormData} receiptId={receipt.id} setReceiptFormData={setReceiptFormData} reset={reset} />
      </div>
    </CustomSessionAuth>
  );
}
