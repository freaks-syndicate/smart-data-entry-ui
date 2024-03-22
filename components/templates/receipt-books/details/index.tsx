'use client';
import { Box, Button, Heading, Input, Link, Text } from '@chakra-ui/react';
import cx from 'classnames';
import { ChangeEvent, useState } from 'react';
import { BsFileEarmarkPlus } from 'react-icons/bs';

import CustomSessionAuth from '@/components/auth/custom-session-auth';
import ReceiptBookDetailsCard from '@/components/books/receipt-book-details-card';
import ReceiptsTable from '@/components/books/receipts/receipts-table';
import { ClientReceipt, ClientReceiptBook } from '@/utils/types';

import styles from './receipt-book-details.module.scss';

export interface IReceiptBookDetailsTemplateProps {
  receiptBook: ClientReceiptBook;
}

let timer: ReturnType<typeof setTimeout>;

export default function ReceiptBookDetailsTemplate(props: IReceiptBookDetailsTemplateProps) {
  const { receiptBook: initialReceiptBook } = props;
  const debounceTime = 300;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [receiptBook, setReceiptBook] = useState<ClientReceiptBook>(initialReceiptBook);

  const nonNullReceipts = receiptBook.receipts?.filter((receipt): receipt is ClientReceipt => receipt !== null) ?? [];

  const filterReceipts = (query: string) => {
    const queryLowercased = query.toLowerCase();

    // Filter receipts, ensuring receipt is not null before accessing its properties
    const filteredReceipts = receiptBook.receipts?.filter((receipt) => {
      if (receipt === null) return false; // Skip null receipts
      return (
        receipt.name?.toLowerCase().includes(queryLowercased) ||
        receipt.receiptNumber.toString().includes(queryLowercased) ||
        receipt.aadharNumber?.toString().includes(queryLowercased) ||
        receipt.panNumber?.toLowerCase().includes(queryLowercased)
      );
    });

    setReceiptBook((prevReceiptBook) => ({
      ...prevReceiptBook,
      receipts: filteredReceipts ?? [],
    }));
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
        <Heading textAlign={'center'} mb={'1rem'}>
          Receipt Book Details
        </Heading>

        {/* Receipt Book Details */}
        <ReceiptBookDetailsCard receiptBook={receiptBook} />

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
              <Text ml={'0.5rem'}>Create Receipt</Text>
            </Button>
          </Link>
        </div>

        <ReceiptsTable receiptBookId={receiptBook.id} receipts={nonNullReceipts} />
      </div>
    </CustomSessionAuth>
  );
}
