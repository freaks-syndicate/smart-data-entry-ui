import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { FC } from "react";

import { IFormData } from "@/utils";

interface formProps {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const Form: FC<formProps> = ({ formData, setFormData }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      if (name === "date") {
        // Parse the input string to a Date object
        const dateValue = new Date(value);
        return { ...prev, [name]: dateValue };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };
  return (
    <>
      <Stack spacing={2} direction="column" align="center">
        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            name="date"
            value={formData.date.toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="test"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Mobile</FormLabel>
          <Input
            type="number"
            name="mobileNumber"
            maxLength={10}
            value={formData.mobileNumber !== null ? formData.mobileNumber : ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Aadhar Number</FormLabel>
          <Input
            type="number"
            name="aadharNumber"
            placeholder="1234 - 1234 - 1234 - 1234"
            maxLength={12}
            value={formData.aadharNumber !== null ? formData.aadharNumber : ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Pan Number</FormLabel>
          <Input
            type="string"
            name="panNumber"
            placeholder="ABCDE - 12345"
            maxLength={10}
            value={formData.panNumber}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Year</FormLabel>
          <Input
            type="number"
            name="year"
            placeholder="1900"
            value={formData.year !== null ? formData.year : ""}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Textarea
            name="address"
            rows={4}
            placeholder="Enter your address here..."
          />
        </FormControl>

        <Stack
          spacing={4}
          direction="row"
          width="100%"
          justifyContent="flex-end"
        >
          <Button colorScheme="green" size="md">
            Save
          </Button>
          <Button colorScheme="red" size="md">
            Reset
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Form;
