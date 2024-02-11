"use client";
import { Box, Input } from "@chakra-ui/react";
import * as React from "react";

import CustomTable from "@/components/table/CustomTable";
import { IRecordModel } from "@/utils/types/be-model-types";
let timer: ReturnType<typeof setTimeout>;

export interface IAppProps {}

const initialData: IRecordModel[] = [
  {
    uuid: "1",
    receiptNumber: 123,
    name: "John Doe",
    aadharNumber: 123456789012,
    panNumber: "ABCDE1234F",
    mobileNumber: 9876543210,
    address: "123 Main Street, City, Country",
    amount: 1000,
    date: "2024-02-10",
  },
  {
    uuid: "2",
    receiptNumber: 456,
    name: "Jane Smith",
    aadharNumber: 987654321098,
    panNumber: "FGHIJ5678K",
    mobileNumber: 9876543210,
    address: "456 Elm Street, City, Country",
    amount: 1500,
    date: "2024-02-09",
  },
  {
    uuid: "3",
    receiptNumber: 789,
    name: "Alice Johnson",
    aadharNumber: 123456789012,
    panNumber: "LMNOP1234Q",
    mobileNumber: 9876543210,
    address: "789 Oak Street, City, Country",
    amount: 2000,
    date: "2024-02-09",
  },
  {
    uuid: "4",
    receiptNumber: 753,
    name: "Bob Brown",
    aadharNumber: 123456789012,
    panNumber: "RSTUV5678W",
    mobileNumber: 9876543210,
    address: "456 Pine Street, City, Country",
    amount: 2500,
    date: "2024-02-09",
  },
  {
    uuid: "5",
    receiptNumber: 951,
    name: "Eva Garcia",
    aadharNumber: 123456789012,
    panNumber: "XYZAB5678C",
    mobileNumber: 9876543210,
    address: "123 Cedar Street, City, Country",
    amount: 3000,
    date: "2024-02-09",
  },
];

export default function HomePageTemplate(props: IAppProps) {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [filteredData, setFilteredData] =
    React.useState<IRecordModel[]>(initialData);

  const debounceTime = 300;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    clearTimeout(timer);
    timer = setTimeout(() => filterData(query), debounceTime);
  };

  const filterData = (query: string) => {
    const filteredData = initialData.filter(
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
  return (
    <div className="container mx-auto">
      <Box margin="20px" width="30%">
        <Input
          variant="outline"
          placeholder="Search by Name, Receipt Number, Aadhar Number, Pan Number"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>
      <CustomTable
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
