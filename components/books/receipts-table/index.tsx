import { useMutation } from '@apollo/client';
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import DeleteConfirmationModal from '@/components/modal/DeleteConfirmationModal';
import { DELETE_RECEIPT } from '@/queries/receipt/delete-receipt';
import { IReceiptBookModel, IReceiptModel } from '@/utils/types/be-model-types';
import { IDeleteReceiptArgs, IDeleteReceiptResponse } from '@/utils/types/query-response.types';

export interface IReceiptsTableProps {
  receiptBookNumber: IReceiptBookModel['receiptBookNumber'];
  receipts: IReceiptModel[];
}

export default function ReceiptsTable(props: IReceiptsTableProps) {
  const { receipts: initialReceipts, receiptBookNumber } = props;

  const [receipts, setReceipts] = useState<IReceiptModel[]>(initialReceipts);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

  const [deleteReceipt, { loading, error }] = useMutation<IDeleteReceiptResponse, IDeleteReceiptArgs>(DELETE_RECEIPT);

  const handleDeleteClick = (receiptId: IReceiptModel['id']) => {
    setRecordToDelete(receiptId);
  };

  const handleDeleteConfirm = () => {
    if (recordToDelete) {
      deleteReceipt({
        variables: { id: recordToDelete },
        onCompleted: () => {
          setReceipts((currentReceipts) => currentReceipts.filter((receipt) => receipt.id !== recordToDelete));
        },
      });
      setRecordToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setRecordToDelete(null);
  };

  // TODO: Gracefully handle UI for loading and error states
  if (loading) return 'Deleting Receipt...';
  if (error) return `Deletion error! ${error.message}`;

  return (
    <Box margin="5" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
            <Tr key={receipt.uuid} _hover={{ bg: 'gray.100' }} transition="background 0.3s ease">
              <Td>
                <Link href={`/books/${receiptBookNumber}/r/${receipt.receiptNumber}`}>{receipt.receiptNumber}</Link>
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
                title={receipt.name}
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
                title={receipt.address}
              >
                {receipt.address}
              </Td>
              <Td>{receipt.amount}</Td>
              <Td>{receipt.aadharNumber}</Td>
              <Td>{receipt.panNumber}</Td>
              <Td>
                <div className="flex gap-2">
                  {/* FIXME: HTML5 standard discourages use of button inside anchor or vice versa */}
                  <Link href={`/books/${receiptBookNumber}/r/${receipt.receiptNumber}/edit`}>
                    <Button colorScheme="blue" size="sm">
                      <FaEdit />
                    </Button>
                  </Link>

                  <Button colorScheme="red" size="sm" onClick={() => handleDeleteClick(receipt.id)}>
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
