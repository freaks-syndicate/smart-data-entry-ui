import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import cx from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import DeleteConfirmationModal from '@/components/modal/DeleteConfirmationModal';
import { ClientReceipt } from '@/utils/types';
import { Receipt, ReceiptBook, ReceiptBookDocument, useDeleteReceiptMutation } from '@/utils/types/generated/graphql';

import styles from './receipts-table.module.scss';

export interface IReceiptsTableProps {
  receiptBookId: ReceiptBook['id'];
  receipts: ClientReceipt[];
  handleUpdateReceiptClick: (receiptId: string) => void;
}

export default function ReceiptsTable(props: IReceiptsTableProps) {
  const { receipts, receiptBookId, handleUpdateReceiptClick } = props;

  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const toast = useToast();

  const [deleteReceiptMutation, { loading, error }] = useDeleteReceiptMutation();

  const handleDeleteClick = (receiptId: Receipt['id']) => {
    setRecordToDelete(receiptId);
  };

  const handleDeleteConfirm = () => {
    if (recordToDelete) {
      deleteReceiptMutation({
        variables: { deleteReceiptId: recordToDelete },
        onCompleted: handleDeleteReceiptCompletion,
        refetchQueries: [
          {
            query: ReceiptBookDocument,
            variables: {
              where: { id: receiptBookId },
            },
          },
        ],
      });
      setRecordToDelete(null);
    }
  };

  const handleDeleteReceiptCompletion = () => {
    toast({
      title: 'Receipt Deleted',
      description: 'Receipt succesfully deleted.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom-left',
    });
  };

  const handleDeleteCancel = () => {
    setRecordToDelete(null);
  };

  // TODO: Gracefully handle UI for loading and error states
  if (loading) return 'Deleting Receipt...';
  if (error) return `Deletion error! ${error.message}`;

  return (
    <Box margin="1" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Table variant="simple">
        <Thead>
          <Tr bg="gray.200">
            <Th>Receipt Number</Th>
            <Th>Date</Th>
            <Th>Mobile Number</Th>
            <Th>Name</Th>
            <Th>Address</Th>
            <Th>Amount</Th>
            <Th>Aadhar Number</Th>
            <Th>Pan Number</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {receipts.map((receipt) => (
            <Tr
              key={receipt.uuid}
              _hover={{ bg: 'gray.100' }}
              transition="background 0.3s ease"
              bgColor={receipt.cancelled ? 'red.50' : ''}
              className={receipt.cancelled ? cx(styles['d-container__cancelled']) : ''}
            >
              <Td>
                <Link href={`/books/${receiptBookId}/r/${receipt.id}`} data-cy="receipt-link">
                  {receipt.receiptNumber}
                </Link>
              </Td>
              <Td>{receipt.date ? new Date(receipt.date).toLocaleDateString('en-US') : '-'}</Td>
              <Td>{receipt.mobileNumber}</Td>
              <Td
                style={{
                  maxWidth: '200px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={receipt.name ?? ''}
              >
                {receipt.name}
              </Td>
              <Td
                style={{
                  maxWidth: '200px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={receipt.address ?? ''}
              >
                {receipt.address}
              </Td>
              <Td>{receipt.amount}</Td>
              <Td>{receipt.aadharNumber}</Td>
              <Td>{receipt.panNumber}</Td>
              <Td>
                <div className="flex gap-2">
                  <Button
                    colorScheme="green"
                    size={'sm'}
                    onClick={() => handleUpdateReceiptClick(receipt.id)}
                    data-cy="edit-receipt-button"
                  >
                    <FaEdit />
                  </Button>

                  <Button colorScheme="red" size="sm" onClick={() => handleDeleteClick(receipt.id)} data-cy="delete-receipt-button">
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
