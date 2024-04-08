import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import cx from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';
import { BsArrowLeft, BsFileEarmarkPlus } from 'react-icons/bs';

import CustomSessionAuth from '@/components/auth/custom-session-auth';
import CreateReceiptBookForm from '@/components/books/create-receipt-book-form';
import UpdateReceiptBookForm from '@/components/books/update-receipt-book-form';
import ReceiptBookTable from '@/components/home/receipt-book-table';
import { ClientReceiptBook } from '@/utils/types';

import styles from './receipt-book-template.module.scss';

export interface IAppProps {
  receiptBooks: ClientReceiptBook[];
}

let timer: ReturnType<typeof setTimeout>;

export default function ReceiptBooksTemplate(props: IAppProps) {
  const { receiptBooks } = props;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showReceiptBookCreationForm, setShowReceiptBookCreationForm] = useState<boolean>(false);
  const [showReceiptBookUpdateForm, setShowReceiptBookUpdateForm] = useState<boolean>(false);
  const [receiptIdToUpdate, setReceiptIdToUpdate] = useState<string>('');
  const [filteredReceiptBooks, setFilteredReceiptBooks] = useState<ClientReceiptBook[]>(receiptBooks);

  const debounceTime = 300;
  const pageTitle = showReceiptBookCreationForm
    ? 'Create Receipt Book'
    : showReceiptBookUpdateForm
      ? 'Udpate Receipt Book'
      : 'Receipt Books';
  const ctaText = showReceiptBookCreationForm || showReceiptBookUpdateForm ? 'Back to Receipt Books' : 'Create Receipt Book';
  const receipBookToUpdate = receiptBooks.filter((receiptBook) => receiptBook?.id === receiptIdToUpdate)[0];

  const filterReceiptBooks = (query: string) => {
    if (!query) {
      setFilteredReceiptBooks(receiptBooks);
      return;
    }

    const queryLowercased = query.toLowerCase();

    // Filter receipt books, ensuring receipt book is not null before accessing its properties
    const filteredReceiptBooks = receiptBooks?.filter((receiptBook) => {
      if (receiptBook === null) return false; // Skip null receipts
      return (
        receiptBook.receiptBookNumber?.toString().includes(queryLowercased) ||
        receiptBook.receiptSeries.toString().includes(queryLowercased)
      );
    });

    setFilteredReceiptBooks(filteredReceiptBooks);
  };

  const handleCtaClick = () => {
    if (!showReceiptBookCreationForm && !showReceiptBookUpdateForm) {
      setShowReceiptBookCreationForm(true);
    } else if (showReceiptBookCreationForm || showReceiptBookUpdateForm) {
      setShowReceiptBookCreationForm(false);
      setShowReceiptBookUpdateForm(false);
    } else {
      setShowReceiptBookUpdateForm(true);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    clearTimeout(timer);
    timer = setTimeout(() => filterReceiptBooks(query), debounceTime);
  };

  const handleUpdateReceiptBookClick = (receiptId: string) => {
    setShowReceiptBookUpdateForm((prev) => !prev);
    setReceiptIdToUpdate(receiptId);
  };

  useEffect(() => {
    setFilteredReceiptBooks(receiptBooks);
  }, [receiptBooks]);

  useEffect(() => () => clearTimeout(timer), []);

  return (
    <CustomSessionAuth>
      <div className={cx(styles['d-container'])}>
        {/* Heading */}
        <Heading textAlign={'center'} mb={'1rem'}>
          {pageTitle}
        </Heading>

        {/* Search and CTA */}
        <div className={cx(styles['d-container__search-cta'])}>
          <Box marginY="20px" width="30%">
            {!showReceiptBookCreationForm && !showReceiptBookUpdateForm ? (
              <Input
                variant="outline"
                placeholder="Search by Receipt Book Number or Receipt Series"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            ) : (
              <div className="h-10"></div>
            )}
          </Box>

          <Button colorScheme="green" onClick={handleCtaClick} minW={'200'}>
            {showReceiptBookCreationForm ? <BsArrowLeft /> : <BsFileEarmarkPlus />}
            <Text ml={'0.5rem'}>{ctaText}</Text>
          </Button>
        </div>

        {showReceiptBookCreationForm ? (
          <CreateReceiptBookForm />
        ) : showReceiptBookUpdateForm ? (
          <UpdateReceiptBookForm receiptBook={receipBookToUpdate as ClientReceiptBook} receiptBookId={receipBookToUpdate.id} />
        ) : (
          <ReceiptBookTable receiptBooks={filteredReceiptBooks} handleUpdateReceiptBookClick={handleUpdateReceiptBookClick} />
        )}
      </div>
    </CustomSessionAuth>
  );
}
