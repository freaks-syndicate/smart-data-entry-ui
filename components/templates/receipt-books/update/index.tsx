'use client';
import { Heading } from '@chakra-ui/react';
import cx from 'classnames';
import { useState } from 'react';

import CustomSessionAuth from '@/components/auth/custom-session-auth';
import UpdateReceiptBookForm from '@/components/books/update-receipt-book-form';
import { IReceiptBookModel } from '@/utils/types/be-model-types';
import { IUpdateReceiptBookArgs } from '@/utils/types/query-response.types';

import styles from './update-receipt-book-template.module.scss';

export interface IUpdateReceiptBookTemplateProps {
  receiptBook: IReceiptBookModel;
}

export default function UpdateReceiptBookTemplate(props: IUpdateReceiptBookTemplateProps) {
  const { receiptBook } = props;

  const INITIAL_RECEIPT_BOOK_FORM_DATA: IUpdateReceiptBookArgs['item'] = {
    receiptBookNumber: receiptBook.receiptBookNumber,
    financialYear: receiptBook.financialYear,
    receiptSeries: receiptBook.receiptSeries,
    totalReceipts: receiptBook.totalReceipts,
  };

  const [receiptBookFormData, setReceiptBookFormData] = useState<IUpdateReceiptBookArgs['item']>(INITIAL_RECEIPT_BOOK_FORM_DATA);

  const reset = () => setReceiptBookFormData(INITIAL_RECEIPT_BOOK_FORM_DATA);

  return (
    <CustomSessionAuth>
      <div className={cx(styles['d-container'])}>
        {/* Heading */}
        <Heading textAlign={'center'}>Update Receipt Book: {receiptBook.receiptBookNumber}</Heading>

        {/* Form */}
        <UpdateReceiptBookForm
          receiptBookId={receiptBook.id}
          receiptBookFormData={receiptBookFormData}
          setReceiptBookFormData={setReceiptBookFormData}
          reset={reset}
        />
      </div>
    </CustomSessionAuth>
  );
}