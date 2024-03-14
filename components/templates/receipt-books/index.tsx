'use client';
import { Box, Button, Input } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { BsFileEarmarkPlus } from 'react-icons/bs';

import CustomSessionAuth from '@/components/auth/custom-session-auth';
import ReceiptBookTable from '@/components/home/receipt-book-table';
import { IReceiptBookModel } from '@/utils/types/be-model-types';

let timer: ReturnType<typeof setTimeout>;

export interface IAppProps {
  receiptBooks: IReceiptBookModel[];
}

export default function ReceiptBooksTemplate(props: IAppProps) {
  const { receiptBooks: initialReceiptBooks } = props;

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [receiptBooks, setReceiptBooks] = useState<IReceiptBookModel[]>(initialReceiptBooks);
  // TODO: remove the below comment when refactoring, supresing the error temporarily
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showCreateReceipt, setShowCreateReceipt] = useState<boolean>(false);

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
      <div className="container mx-auto">
        <div className="flex flex-row items-baseline justify-between">
          <Box margin="20px" width="30%">
            <Input
              variant="outline"
              placeholder="Search by Receipt Book Number or Receipt Series"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>

          {/* TODO: If need to redirect on a diff page, use <Link /> component instead */}
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
