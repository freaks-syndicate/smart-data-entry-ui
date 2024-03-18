'use client';
import { Heading } from '@chakra-ui/react';
import cx from 'classnames';
import { useState } from 'react';

import CustomSessionAuth from '@/components/auth/custom-session-auth';
import CreateReceiptBookForm from '@/components/books/create-receipt-book-form';
import { ICreateReceiptBookArgs } from '@/utils/types/query-response.types';

import styles from './create-receipt-book-template.module.scss';

export interface ICreateReceiptBookTemplateProps {}

const INITIAL_RECEIPT_BOOK_FORM_DATA: ICreateReceiptBookArgs['item'] = {
  receiptBookNumber: 0,
  financialYear: '',
  receiptSeries: 0,
  totalReceipts: 0,
};

export default function CreateReceiptBookTemplate(_props: ICreateReceiptBookTemplateProps) {
  const [receiptBookFormData, setReceiptBookFormData] = useState<ICreateReceiptBookArgs['item']>(INITIAL_RECEIPT_BOOK_FORM_DATA);

  const reset = () => setReceiptBookFormData(INITIAL_RECEIPT_BOOK_FORM_DATA);

  return (
    <CustomSessionAuth>
      <div className={cx(styles['d-container'])}>
        {/* Heading */}
        <Heading textAlign={'center'}>Create Receipt</Heading>

        {/* Form */}
        <CreateReceiptBookForm receiptBookFormData={receiptBookFormData} setReceiptBookFormData={setReceiptBookFormData} reset={reset} />
      </div>
    </CustomSessionAuth>
  );
}
