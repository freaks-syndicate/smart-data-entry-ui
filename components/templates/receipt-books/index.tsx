import { Box, Button, Heading, Input } from '@chakra-ui/react';
import cx from 'classnames';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { BsFileEarmarkPlus } from 'react-icons/bs';

import CustomSessionAuth from '@/components/auth/custom-session-auth';
import ReceiptBookTable from '@/components/home/receipt-book-table';
import { ClientReceiptBook } from '@/utils/types';

import styles from './receipt-book-template.module.scss';

export interface IAppProps {
  receiptBooks: ClientReceiptBook[];
}

let timer: ReturnType<typeof setTimeout>;

export default function ReceiptBooksTemplate(props: IAppProps) {
  const { receiptBooks: initialReceiptBooks } = props;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [receiptBooks, setReceiptBooks] = useState<ClientReceiptBook[]>(initialReceiptBooks);

  const debounceTime = 300;

  const filterReceiptBooks = (query: string) => {
    if (!query) {
      setReceiptBooks(initialReceiptBooks);
      return;
    }

    const queryLowercased = query.toLowerCase();

    // Filter receipt books, ensuring receipt book is not null before accessing its properties
    const filteredReceiptBooks = initialReceiptBooks?.filter((receiptBook) => {
      if (receiptBook === null) return false; // Skip null receipts
      return (
        receiptBook.receiptBookNumber?.toString().includes(queryLowercased) ||
        receiptBook.receiptSeries.toString().includes(queryLowercased)
      );
    });

    setReceiptBooks(filteredReceiptBooks);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    clearTimeout(timer);
    timer = setTimeout(() => filterReceiptBooks(query), debounceTime);
  };

  useEffect(() => () => clearTimeout(timer), []);

  return (
    <CustomSessionAuth>
      <div className={cx(styles['d-container'])}>
        {/* Heading */}
        <Heading textAlign={'center'}>Receipt Books</Heading>

        {/* Search and CTA */}
        <div className={cx(styles['d-container__search-cta'])}>
          <Box margin="20px" width="30%">
            <Input
              variant="outline"
              placeholder="Search by Receipt Book Number or Receipt Series"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>

          {/* FIXME: HTML5 standard discourages use of button inside anchor or vice versa */}
          <Link href={'/books/create'}>
            <Button colorScheme="green">
              <BsFileEarmarkPlus />
              Create Receipt Book
            </Button>
          </Link>
        </div>

        <ReceiptBookTable receiptBooks={receiptBooks} />
      </div>
    </CustomSessionAuth>
  );
}
