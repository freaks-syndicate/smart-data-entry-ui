import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import cx from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';
import { BsArrowLeft, BsFileEarmarkPlus } from 'react-icons/bs';

import CustomSessionAuth from '@/components/auth/custom-session-auth';
import ReceiptBookDetailsCard from '@/components/books/receipt-book-details-card';
import CreateReceiptForm from '@/components/books/receipts/create-receipt-form';
import ReceiptsTable from '@/components/books/receipts/receipts-table';
import UpdateReceiptForm from '@/components/books/receipts/update-receipt-form';
import { ClientReceipt, ClientReceiptBook } from '@/utils/types';

import styles from './receipt-book-details.module.scss';

export interface IReceiptBookDetailsTemplateProps {
  receiptBook: ClientReceiptBook;
}

let timer: ReturnType<typeof setTimeout>;

export default function ReceiptBookDetailsTemplate(props: IReceiptBookDetailsTemplateProps) {
  const { receiptBook } = props;
  const debounceTime = 300;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showReceiptCreationForm, setShowReceiptCreationForm] = useState<boolean>(false);
  const [showReceiptUpdateForm, setShowReceiptUpdateForm] = useState<boolean>(false);
  const [receiptIdToUpdate, setReceiptIdToUpdate] = useState<string>('');
  const [filteredReceipts, setFilteredReceipts] = useState<ClientReceiptBook['receipts']>(receiptBook.receipts);

  useEffect(() => {
    setFilteredReceipts(receiptBook.receipts);
  }, [receiptBook.receipts]);

  const nonNullReceipts = filteredReceipts?.filter((receipt): receipt is ClientReceipt => receipt !== null) ?? [];
  const receipToUpdate = receiptBook.receipts?.filter((receipt) => receipt?.id === receiptIdToUpdate)[0];
  const pageTitle = showReceiptCreationForm ? 'Create Receipt' : showReceiptUpdateForm ? 'Udpate Receipt' : 'Receipt Book Details';
  const ctaText = showReceiptCreationForm || showReceiptUpdateForm ? 'Back to Receipts' : 'Create Receipt';

  const filterReceipts = (query: string) => {
    if (!query) {
      setFilteredReceipts(() => receiptBook.receipts);
      return;
    }

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

    setFilteredReceipts(() => filteredReceipts);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    clearTimeout(timer);
    timer = setTimeout(() => filterReceipts(query), debounceTime);
  };

  const handleCtaClick = () => {
    if (!showReceiptCreationForm && !showReceiptUpdateForm) {
      setShowReceiptCreationForm(true);
    } else if (showReceiptCreationForm || showReceiptUpdateForm) {
      setShowReceiptCreationForm(false);
      setShowReceiptUpdateForm(false);
    } else {
      setShowReceiptUpdateForm(true);
    }
  };

  const handleUpdateReceiptClick = (receiptId: string) => {
    setShowReceiptUpdateForm((prev) => !prev);
    setReceiptIdToUpdate(receiptId);
  };

  return (
    <CustomSessionAuth>
      <div className={cx(styles['d-container'])}>
        {/* Heading */}
        <Heading textAlign={'center'} mb={'1rem'}>
          {pageTitle}
        </Heading>

        {/* Receipt Book Details */}
        <ReceiptBookDetailsCard receiptBook={receiptBook} />

        {/* Search and CTA */}
        <div className={cx(styles['d-container__search-cta'])}>
          <Box marginY="20px" width="42%">
            {!showReceiptCreationForm && !showReceiptUpdateForm ? (
              <Input
                variant="outline"
                placeholder="Search by Name, Receipt Number, Aadhar Number, PAN Number"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            ) : (
              <div className="h-10"></div>
            )}
          </Box>

          <Button colorScheme="green" onClick={handleCtaClick} minW={'200'}>
            {showReceiptCreationForm ? <BsArrowLeft /> : <BsFileEarmarkPlus />}
            <Text ml={'0.5rem'}>{ctaText}</Text>
          </Button>
        </div>

        {showReceiptCreationForm ? (
          <CreateReceiptForm receiptBookId={receiptBook.id} />
        ) : showReceiptUpdateForm ? (
          <UpdateReceiptForm receipt={receipToUpdate as ClientReceipt} receiptBookId={receiptBook.id} />
        ) : (
          <ReceiptsTable receiptBookId={receiptBook.id} receipts={nonNullReceipts} handleUpdateReceiptClick={handleUpdateReceiptClick} />
        )}
      </div>
    </CustomSessionAuth>
  );
}
