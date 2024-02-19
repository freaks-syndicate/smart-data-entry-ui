import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { IReceiptModel } from "@/utils/types/be-model-types";

import DeleteConfirmationModal from "../modal/DeleteConfirmationModal";

interface Props {
  data: IReceiptModel[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CustomTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const handleDeleteClick = (id: string) => {
    setRecordToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (recordToDelete) {
      onDelete(recordToDelete);
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
          {data.map((record) => (
            <Tr
              key={record.uuid}
              _hover={{ bg: "gray.100" }}
              transition="background 0.3s ease"
            >
              <Td>
                <Link href={`/receipts/${record.receiptNumber}`}>
                  {record.receiptNumber}
                </Link>
              </Td>
              <Td>
                {record.date
                  ? new Date(record.date).toLocaleDateString("en-US")
                  : "-"}
              </Td>
              <Td>{record.mobileNumber}</Td>
              <Td>{record.name}</Td>
              <Td>{record.address}</Td>
              <Td>{record.amount}</Td>
              <Td>{record.aadharNumber}</Td>
              <Td>{record.panNumber}</Td>
              <Td>
                <div className="flex gap-2">
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => onEdit(record.uuid)}
                  >
                    <FaEdit />
                  </Button>

                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDeleteClick(record.uuid)}
                  >
                    <MdDelete />
                  </Button>
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <DeleteConfirmationModal
        isOpen={!!recordToDelete}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default CustomTable;
