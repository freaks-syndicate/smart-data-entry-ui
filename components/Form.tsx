"use client";

import { AudioMutedOutlined, AudioOutlined } from "@ant-design/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";

import { useSpeechToText } from "@/hooks/useSpeechToText";
import { IFormData } from "@/utils";

interface formProps {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const Form: FC<formProps> = ({ formData, setFormData }) => {
  const [activeField, setActiveField] = useState<string | null>(null);
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    error,
    setSpeechLanguage,
  } = useSpeechToText();

  const [realTimeTranscript, setRealTimeTranscript] = useState("");

  useEffect(() => {
    if (activeField === "name" || activeField === "address") {
      setSpeechLanguage("mr-IN");
    } else {
      setSpeechLanguage("en-US");
    }
    // Update the real-time transcript display while listening
    if (isListening && activeField !== null) {
      setRealTimeTranscript(transcript);
      setFormData((prev) => ({ ...prev, [activeField]: realTimeTranscript }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, isListening, realTimeTranscript, setFormData]);

  useEffect(() => {
    setRealTimeTranscript("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeField]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

  const handleSpeechClick = (fieldName: string) => {
    setRealTimeTranscript("");
    setActiveField(fieldName);
    isListening ? stopListening() : startListening();
  };

  const renderSpeechIcon = (fieldName: string) => {
    return (
      <Button
        onClick={() => handleSpeechClick(fieldName)}
        size="sm"
        variant="ghost"
      >
        {isListening && activeField === fieldName ? (
          <AudioOutlined />
        ) : (
          <AudioMutedOutlined />
        )}
      </Button>
    );
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
        <FormControl position="relative">
          <FormLabel>Name</FormLabel>
          <Input
            type="test"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">
            {renderSpeechIcon("name")}
          </div>
        </FormControl>
        <FormControl position="relative">
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
          {/*<div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">
            {renderSpeechIcon("amount")}
          </div>*/}
        </FormControl>
        <FormControl position="relative">
          <FormLabel>Mobile</FormLabel>
          <Input
            type="number"
            name="mobileNumber"
            maxLength={10}
            value={formData.mobileNumber !== null ? formData.mobileNumber : ""}
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">
            {renderSpeechIcon("mobileNumber")}
          </div>
        </FormControl>
        <FormControl position="relative">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">
            {renderSpeechIcon("email")}
          </div>
        </FormControl>

        <FormControl position="relative">
          <FormLabel>Aadhar Number</FormLabel>
          <Input
            type="string"
            name="aadharNumber"
            placeholder="1234 - 1234 - 1234 - 1234"
            maxLength={12}
            value={formData.aadharNumber !== null ? formData.aadharNumber : ""}
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">
            {renderSpeechIcon("aadharNumber")}
          </div>
        </FormControl>
        <FormControl position="relative">
          <FormLabel>Pan Number</FormLabel>
          <Input
            type="string"
            name="panNumber"
            placeholder="ABCDE - 12345"
            maxLength={10}
            value={formData.panNumber}
            onChange={handleChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">
            {renderSpeechIcon("panNumber")}
          </div>
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
        <FormControl position="relative">
          <FormLabel>Address</FormLabel>
          <Textarea
            name="address"
            rows={4}
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address here..."
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">
            {renderSpeechIcon("address")}
          </div>
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
