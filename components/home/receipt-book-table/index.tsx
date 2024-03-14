import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import DeleteConfirmationModal from '@/components/modal/DeleteConfirmationModal';
import { IReceiptBookModel } from '@/utils/types/be-model-types';

export interface IReceiptBookTableProps {
  receiptBooks: IReceiptBookModel[];
}

export default function ReceiptBookTable(props: IReceiptBookTableProps) {
  const receiptBooks = props.receiptBooks;

  const [recordToDelete, setRecordToDelete] = useState<number | null>(null);

  const handleDelete = (receiptBookNumber: IReceiptBookModel['receiptBookNumber']) => {
    setRecordToDelete(receiptBookNumber);
  };

  const handleDeleteConfirm = () => {
    if (recordToDelete) {
      // TODO: Delete record action
      setRecordToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setRecordToDelete(null);
  };

  return (
    <Box margin="5" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Table variant="simple">
        <Thead>
          <Tr bg="gray.200">
            <Th>Receipt Book Number</Th>
            <Th>Receipt Series</Th>
            <Th>Total Receipts</Th>
            <Th>Used Receipts</Th>
            <Th>Financial Year</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {receiptBooks.map((receiptBook) => (
            <Tr key={receiptBook.uuid} _hover={{ bg: 'gray.100' }} transition="background 0.3s ease">
              <Td>
                <Link href={`/books/${receiptBook.receiptBookNumber}`}>{receiptBook.receiptBookNumber}</Link>
              </Td>
              <Td>{receiptBook.receiptSeries}</Td>
              <Td>{receiptBook.totalReceipts}</Td>
              <Td>{receiptBook.usedReceipts}</Td>
              <Td>{receiptBook.financialYear}</Td>
              <Td>
                <div className="flex gap-2">
                  {/* FIXME: HTML5 standard discourages use of button inside anchor or vice versa */}
                  <Link href={`/books/update/${receiptBook.receiptBookNumber}`}>
                    <Button colorScheme="blue" size="sm">
                      <FaEdit />
                    </Button>
                  </Link>

                  <Button colorScheme="red" size="sm" onClick={() => handleDelete(receiptBook.receiptBookNumber)}>
                    <MdDelete />
                  </Button>
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <DeleteConfirmationModal isOpen={!!recordToDelete} onClose={handleDeleteCancel} onConfirm={handleDeleteConfirm} />
    </Box>
  );
}
