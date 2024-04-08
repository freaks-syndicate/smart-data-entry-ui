import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

import DeleteConfirmationModal from '@/components/modal/DeleteConfirmationModal';
import { ClientReceiptBook } from '@/utils/types';
import { ReceiptBooksDocument, useDeleteReceiptBookMutation } from '@/utils/types/generated/graphql';

export interface IReceiptBookTableProps {
  receiptBooks: ClientReceiptBook[];
  handleUpdateReceiptBookClick: (receipBookId: string) => void;
}

export default function ReceiptBookTable(props: IReceiptBookTableProps) {
  const { receiptBooks, handleUpdateReceiptBookClick } = props;

  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const toast = useToast();

  const [deleteReceiptBookMutation, { loading, error }] = useDeleteReceiptBookMutation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDelete = (receiptBookId: ClientReceiptBook['id']) => {
    setRecordToDelete(receiptBookId);
  };

  const handleDeleteReceiptBookCompletion = () => {
    toast({
      title: 'Receipt Deleted',
      description: 'Receipt succesfully deleted.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom-left',
    });
  };

  const handleDeleteConfirm = () => {
    if (recordToDelete) {
      deleteReceiptBookMutation({
        variables: { deleteReceiptBookId: recordToDelete },
        onCompleted: handleDeleteReceiptBookCompletion,
        refetchQueries: [{ query: ReceiptBooksDocument, variables: { paginate: { page: 0, pageSize: 10 } } }],
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
    <Box margin="1" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
            <Tr key={receiptBook.id} _hover={{ bg: 'gray.100' }} transition="background 0.3s ease">
              <Td>
                <Link href={`/books/${receiptBook.id}`}>{receiptBook.receiptBookNumber}</Link>
              </Td>
              <Td>{receiptBook.receiptSeries}</Td>
              <Td>{receiptBook.totalReceipts}</Td>
              <Td>{receiptBook.usedReceipts}</Td>
              <Td>{receiptBook.financialYear}</Td>
              <Td>
                <div className="flex gap-2">
                  <Button colorScheme="green" size={'sm'} onClick={() => handleUpdateReceiptBookClick(receiptBook.id)}>
                    <FaEdit />
                  </Button>

                  {/* TODO: TBD is delete receipt book needed? */}
                  {/* <Button colorScheme="red" size="sm" onClick={() => handleDelete(receiptBook.id)}>
                    <MdDelete />
                  </Button> */}
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
