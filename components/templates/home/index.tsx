"use client";
import { Box, Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { BsFileEarmarkPlus } from "react-icons/bs";

import CreateRecipt from "@/components/CreateRecipt";
import CustomTable from "@/components/table/CustomTable";
import { IReceiptModel } from "@/utils/types/be-model-types";

let timer: ReturnType<typeof setTimeout>;

export interface IAppProps {
  data: IReceiptModel[];
}

export default function HomePageTemplate(props: IAppProps) {
  const { data: initialReceipts } = props;

  const router = useRouter();

  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [filteredData, setFilteredData] =
    React.useState<IReceiptModel[]>(initialReceipts);
  const [showCreateReceipt, setShowCreateReceipt] =
    React.useState<boolean>(false);

  const debounceTime = 300;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    clearTimeout(timer);
    timer = setTimeout(() => filterData(query), debounceTime);
  };

  const filterData = (query: string) => {
    const filteredData = initialReceipts.filter(
      (record) =>
        record.name.toLowerCase().includes(query.toLowerCase()) ||
        record.receiptNumber.toString().includes(query.toLowerCase()) ||
        (record.aadharNumber &&
          record.aadharNumber.toString().includes(query.toLowerCase())) ||
        (record.panNumber &&
          record.panNumber.toLowerCase().includes(query.toLowerCase())),
    );
    setFilteredData(filteredData);
  };

  const handleEdit = (id: string) => {
    // Handle edit action here
    console.log("Edit record with id:", id);
  };

  const handleDelete = (id: string) => {
    // Handle delete action here
    console.log("Delete record with id:", id);
  };

  const toggleCreateReceipt = () => {
    // setShowCreateReceipt(!showCreateReceipt);
    router.push("/create-receipt");
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row items-baseline justify-between">
        <Box margin="20px" width="30%">
          <Input
            variant="outline"
            placeholder="Search by Name, Receipt Number, Aadhar Number, Pan Number"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>

        <Button colorScheme="green" onClick={toggleCreateReceipt}>
          <BsFileEarmarkPlus />
          Create Record
        </Button>
      </div>
      <CustomTable
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showCreateReceipt && <CreateRecipt />}
    </div>
  );
}
