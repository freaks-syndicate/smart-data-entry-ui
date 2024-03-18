'use client';
import { Box, Button, Heading, Input, Link } from '@chakra-ui/react';
import cx from 'classnames';
import { ChangeEvent, useState } from 'react';
import { BsFileEarmarkPlus } from 'react-icons/bs';

import CustomSessionAuth from '@/components/auth/custom-session-auth';
import ReceiptsTable from '@/components/books/receipts/receipts-table';
import { IReceiptBookModel } from '@/utils/types/be-model-types';

import styles from './receipt-book-details.module.scss';

export interface IReceiptBookDetailsTemplateProps {
  receiptBook: IReceiptBookModel;
}

let timer: ReturnType<typeof setTimeout>;

export default function ReceiptBookDetailsTemplate(props: IReceiptBookDetailsTemplateProps) {
  const { receiptBook: initialReceiptBook } = props;
  const debounceTime = 300;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [receiptBook, setReceiptBook] = useState<IReceiptBookModel>(initialReceiptBook);

  const filterReceipts = (query: string) => {
    const filteredReceipts =
      receiptBook.receipts &&
      receiptBook.receipts.filter(
        (receipt) =>
          receipt.name.toLowerCase().includes(query.toLowerCase()) ||
          receipt.receiptNumber.toString().includes(query.toLowerCase()) ||
          (receipt.aadharNumber && receipt.aadharNumber.toString().includes(query.toLowerCase())) ||
          (receipt.panNumber && receipt.panNumber.toLowerCase().includes(query.toLowerCase())),
      );
    setReceiptBook((prevReceiptBook) => ({ ...prevReceiptBook, receipts: filteredReceipts }));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    clearTimeout(timer);
    timer = setTimeout(() => filterReceipts(query), debounceTime);
  };

  return (
    <CustomSessionAuth>
      <div className={cx(styles['d-container'])}>
        {/* Heading */}
        <Heading textAlign={'center'}>Receipt Book: {initialReceiptBook.receiptBookNumber}</Heading>

        {/* Search and CTA */}
        <div className={cx(styles['d-container__search-cta'])}>
          <Box marginY="20px" width="42%">
            <Input
              variant="outline"
              placeholder="Search by Name, Receipt Number, Aadhar Number, Pan Number"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>

          {/* FIXME: HTML5 standard discourages use of button inside anchor or vice versa */}
          <Link href={`/books/${receiptBook.id}/r/create`}>
            <Button colorScheme="green">
              <BsFileEarmarkPlus />
              Create Receipt
            </Button>
          </Link>
        </div>

        <ReceiptsTable receiptBookId={receiptBook.id} receipts={receiptBook.receipts ?? []} />
      </div>
    </CustomSessionAuth>
  );
}
