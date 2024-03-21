import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import DeleteConfirmationModal from '@/components/modal/DeleteConfirmationModal';
import { ReceiptBook, ReceiptBooksDocument, useDeleteReceiptBookMutation } from '@/utils/types/generated/graphql';

export interface IReceiptBookTableProps {
  receiptBooks: ReceiptBook[];
}

export default function ReceiptBookTable(props: IReceiptBookTableProps) {
  const { receiptBooks: initialReceiptBooks } = props;

  const [receiptBooks, setReceiptBooks] = useState<ReceiptBook[]>(initialReceiptBooks);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

  const [deleteReceiptBookMutation, { loading, error }] = useDeleteReceiptBookMutation();

  const handleDelete = (receiptBookId: ReceiptBook['id']) => {
    setRecordToDelete(receiptBookId);
  };

  const handleDeleteConfirm = () => {
    if (recordToDelete) {
      deleteReceiptBookMutation({
        variables: { deleteReceiptBookId: recordToDelete },
        refetchQueries: [{ query: ReceiptBooksDocument, variables: { paginate: { page: 0, pageSize: 10 } } }],
        onCompleted: () => {
          setReceiptBooks((currentReceiptBooks) => currentReceiptBooks.filter((receiptBook) => receiptBook.id !== recordToDelete));
        },
      });
      setRecordToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setRecordToDelete(null);
  };

  // TODO: Gracefully handle UI for loading and error states
  if (loading) return 'Deleting Receipt Book...';
  if (error) return `Deletion error! ${error.message}`;

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
                <Link href={`/books/${receiptBook.id}`}>{receiptBook.receiptBookNumber}</Link>
              </Td>
              <Td>{receiptBook.receiptSeries}</Td>
              <Td>{receiptBook.totalReceipts}</Td>
              <Td>{receiptBook.usedReceipts}</Td>
              <Td>{receiptBook.financialYear}</Td>
              <Td>
                <div className="flex gap-2">
                  {/* FIXME: HTML5 standard discourages use of button inside anchor or vice versa */}
                  <Link href={`/books/${receiptBook.id}/update`}>
                    <Button colorScheme="blue" size="sm">
                      <FaEdit />
                    </Button>
                  </Link>

                  <Button colorScheme="red" size="sm" onClick={() => handleDelete(receiptBook.id)}>
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
