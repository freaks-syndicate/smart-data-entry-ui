import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, FormControl, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import { useSpeechToText } from '@/hooks/useSpeechToText';
import { CREATE_RECEIPT } from '@/queries/receipt/create-receipt';
import { ICreateReceiptArgs, ICreateReceiptResponse } from '@/utils/types/query-response.types';

import styles from './create-receipt-form.module.scss';

export interface ICreateReceiptFormProps {
  receiptFormData: ICreateReceiptArgs['item'];
  setReceiptFormData: React.Dispatch<React.SetStateAction<ICreateReceiptArgs['item']>>;
}

export default function CreateReceiptForm(props: ICreateReceiptFormProps) {
  const { receiptFormData, setReceiptFormData } = props;

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    // error,
    setSpeechLanguage,
  } = useSpeechToText();

  const [createReceipt, { loading, error: createReceiptError }] = useMutation<ICreateReceiptResponse, ICreateReceiptArgs>(CREATE_RECEIPT);

  const handleCreateReceiptClick = () => {
    createReceipt({ variables: { item: receiptFormData } });
  };

  const [realTimeTranscript, setRealTimeTranscript] = useState('');
  const [activeField, setActiveField] = useState<string | null>(null);

  useEffect(() => {
    if (activeField === 'name' || activeField === 'address') {
      setSpeechLanguage('mr-IN');
    } else {
      setSpeechLanguage('en-US');
    }
    // Update the real-time transcript display while listening
    if (isListening && activeField !== null) {
      setRealTimeTranscript(transcript);
      setReceiptFormData((prev) => ({ ...prev, [activeField]: realTimeTranscript }));
    }
  }, [transcript, isListening, realTimeTranscript, activeField, setSpeechLanguage, setReceiptFormData]);

  useEffect(() => {
    setRealTimeTranscript('');
  }, [activeField]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setReceiptFormData((prev) => {
      if (name === 'date') {
        // Parse the input string to a Date object
        const dateValue = new Date(value);
        return { ...prev, [name]: dateValue.toISOString() };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const handleSpeechClick = (fieldName: string) => {
    setRealTimeTranscript('');
    setActiveField(fieldName);
    isListening ? stopListening() : startListening();
  };

  const renderSpeechIcon = (fieldName: string) => (
    <Button onClick={() => handleSpeechClick(fieldName)} size="sm" variant="ghost">
      {isListening && activeField === fieldName ? <AudioOutlined /> : <AudioMutedOutlined />}
    </Button>
  );

  if (createReceiptError) {
    console.error(createReceiptError);
  }

  return (
    <Stack spacing={2} direction="column" align="center" className={cx(styles['d-container'])}>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input type="date" name="date" value={receiptFormData.date.split('T')[0]} onChange={handleChange} />
      </FormControl>
      <FormControl position="relative">
        <FormLabel>Name</FormLabel>
        <Input type="test" name="name" value={receiptFormData.name} onChange={handleChange} />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('name')}</div>
      </FormControl>
      <FormControl position="relative">
        <FormLabel>Amount</FormLabel>
        <Input type="number" name="amount" value={receiptFormData.amount} onChange={handleChange} />
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
          value={receiptFormData.mobileNumber !== null ? receiptFormData.mobileNumber : ''}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('mobileNumber')}</div>
      </FormControl>

      <FormControl position="relative">
        <FormLabel>Aadhar Number</FormLabel>
        <Input
          type="string"
          name="aadharNumber"
          placeholder="1234 - 1234 - 1234 - 1234"
          maxLength={12}
          value={receiptFormData.aadharNumber !== null ? receiptFormData.aadharNumber : ''}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('aadharNumber')}</div>
      </FormControl>
      <FormControl position="relative">
        <FormLabel>Pan Number</FormLabel>
        <Input
          type="string"
          name="panNumber"
          placeholder="ABCDE1234R"
          maxLength={10}
          value={receiptFormData.panNumber}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('panNumber')}</div>
      </FormControl>
      <FormControl>
        <FormLabel>Financial Year</FormLabel>
        <Input
          type="number"
          name="year"
          placeholder="2023-2024"
          value={receiptFormData.financialYear !== null ? receiptFormData.financialYear : ''}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl position="relative">
        <FormLabel>Address</FormLabel>
        <Textarea
          name="address"
          rows={4}
          value={receiptFormData.address}
          onChange={handleChange}
          placeholder="Enter your address here..."
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('address')}</div>
      </FormControl>

      <Stack spacing={4} direction="row" width="100%" justifyContent="flex-end">
        <Button colorScheme="green" size="md" disabled={loading} onClick={handleCreateReceiptClick}>
          Save
        </Button>
        <Button colorScheme="red" size="md">
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
