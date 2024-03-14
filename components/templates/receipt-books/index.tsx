'use client';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { BsFileEarmarkPlus } from 'react-icons/bs';

import CustomSessionAuth from '@/components/auth/custom-session-auth';
import ReceiptBookTable from '@/components/home/receipt-book-table';
import { IReceiptBookModel } from '@/utils/types/be-model-types';

import styles from './receipt-book-template.module.scss';

let timer: ReturnType<typeof setTimeout>;

export interface IAppProps {
  receiptBooks: IReceiptBookModel[];
}

export default function ReceiptBooksTemplate(props: IAppProps) {
  const { receiptBooks: initialReceiptBooks } = props;

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [receiptBooks, setReceiptBooks] = useState<IReceiptBookModel[]>(initialReceiptBooks);

  const debounceTime = 300;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    clearTimeout(timer);
    timer = setTimeout(() => filterReceiptBooks(query), debounceTime);
  };

  const filterReceiptBooks = (query: string) => {
    const filteredReceiptBooks = receiptBooks.filter(
      (record) =>
        record.receiptBookNumber.toString().includes(query.toLowerCase()) || record.receiptSeries.toString().includes(query.toLowerCase()),
    );
    setReceiptBooks(filteredReceiptBooks);
  };

  const toggleCreateReceipt = () => {
    router.push('/create-receipt');
  };

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
            <Button colorScheme="green" onClick={toggleCreateReceipt}>
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