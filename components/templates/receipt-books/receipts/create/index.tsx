'use client';
import { Heading } from '@chakra-ui/react';
import cx from 'classnames';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import CustomSessionAuth from '@/components/auth/custom-session-auth';
import CreateReceiptForm from '@/components/books/receipts/create-receipt-form';
import { ModeOfPayment } from '@/utils/types/be-model-types';
import { ICreateReceiptArgs } from '@/utils/types/query-response.types';

import styles from './create-receipt-template.module.scss';

export interface ICreateReceiptTemplateProps {}

export default function CreateReceiptTemplate(_props: ICreateReceiptTemplateProps) {
  const params = useParams();
  const receiptBookId = params.receiptBookId;

  const INITIAL_RECEIPT_FORM_DATA: ICreateReceiptArgs['item'] = {
    receiptNumber: 0,
    name: '',
    financialYear: '',
    date: new Date().toISOString(),
    mobileNumber: undefined,
    address: '',
    amount: 0.0,
    aadharNumber: undefined,
    panNumber: '',
    modeOfPayment: ModeOfPayment.cash,
    receiptBookId: receiptBookId as string,
  };

  const [receiptFormData, setReceiptFormData] = useState<ICreateReceiptArgs['item']>(INITIAL_RECEIPT_FORM_DATA);

  return (
    <CustomSessionAuth>
      <div className={cx(styles['d-container'])}>
        {/* Heading */}
        <Heading textAlign={'center'}>Create Receipt</Heading>

        {/* Form */}
        <CreateReceiptForm receiptFormData={receiptFormData} setReceiptFormData={setReceiptFormData} />
      </div>
    </CustomSessionAuth>
  );
}
