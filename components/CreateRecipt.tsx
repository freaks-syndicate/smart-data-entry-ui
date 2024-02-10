"use client";
import { Box, Center, Divider, Fade, Heading, Text } from "@chakra-ui/react";
import React, { FC, useState } from "react";

import { IFormData } from "@/utils";

import Form from "./Form";

const CreateRecipt: FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    reciptNumber: 0,
    email: "",
    name: "",
    year: null,
    date: new Date(),
    mobileNumber: null,
    address: "",
    amount: 0.0,
    aadharNumber: null,
    panNumber: "",
  });

  console.log("form data", formData);
  return (
    <Center height="100vh" width="100vw" marginY={15}>
      <Box
        background="gray.50"
        borderRadius="md"
        shadow="md"
        padding="6"
        width="50vw"
      >
        <Heading textAlign="center">Add Recipt</Heading>
        <Box height="2rem"></Box>
        <Text></Text>
        <Box height="2rem"></Box>
        <Form formData={formData} setFormData={setFormData} />
      </Box>
    </Center>
  );
};

export default CreateRecipt;
