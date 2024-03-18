import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, FormControl, FormLabel, Input, Select, Stack, Textarea, useToast } from '@chakra-ui/react';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import { useSpeechToText } from '@/hooks/useSpeechToText';
import { UPDATE_RECEIPT } from '@/queries/receipt/update-receipt';
import { filterNonNullFields } from '@/utils/functions/filter-non-null-fields';
import { ModeOfPayment } from '@/utils/types/be-model-types';
import { IUpdateReceiptArgs, IUpdateReceiptResponse } from '@/utils/types/query-response.types';

import styles from './update-receipt-form.module.scss';

export interface IUpdateReceiptFormProps {
  receiptId: string;
  receiptFormData: IUpdateReceiptArgs['item'];
  setReceiptFormData: React.Dispatch<React.SetStateAction<IUpdateReceiptArgs['item']>>;
  reset: () => void;
}

export default function UpdateReceiptForm(props: IUpdateReceiptFormProps) {
  const { receiptFormData, receiptId, reset, setReceiptFormData } = props;

  const toast = useToast();
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    // error,
    setSpeechLanguage,
  } = useSpeechToText();

  const [updateReceipt, { loading, error: updateReceiptError }] = useMutation<IUpdateReceiptResponse, IUpdateReceiptArgs>(UPDATE_RECEIPT);

  const [realTimeTranscript, setRealTimeTranscript] = useState('');
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleReceiptCompletion = () => {
    toast({
      title: 'Receipt Updated',
      description: 'You have successfully updated the receipt book.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom-left',
    });

    reset();
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

  const handleUpdateReceiptClick = () => {
    // TODO: Handle various errors
    const payload = filterNonNullFields(receiptFormData);
    updateReceipt({
      variables: { updateReceiptId: receiptId, item: payload },
      onCompleted: handleReceiptCompletion,
      refetchQueries: ['GET_RECEIPTS'],
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    setReceiptFormData((prev) => {
      if (name === 'date') {
        // Parse the input string to a Date object
        const dateValue = new Date(value);
        return { ...prev, [name]: dateValue.toISOString() };
      } else if (type === 'number') {
        // FIXME: Mobile number should in string, fails the update query
        return { ...prev, [name]: +value };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

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

  if (updateReceiptError) {
    console.error(updateReceiptError);
  }

  return (
    <Stack spacing={2} direction="column" align="center" className={cx(styles['d-container'])}>
      {/* Date */}
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input
          type="date"
          name="date"
          value={receiptFormData.date ? receiptFormData.date.split('T')[0] : new Date().toISOString()}
          onChange={handleChange}
        />
      </FormControl>

      {/* Name */}
      <FormControl position="relative">
        <FormLabel>Name</FormLabel>
        <Input type="test" name="name" value={receiptFormData.name} onChange={handleChange} />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('name')}</div>
      </FormControl>

      {/* Receipt Number */}
      <FormControl position="relative">
        <FormLabel>Receipt Number</FormLabel>
        <Input
          type="number"
          name="receiptNumber"
          maxLength={10}
          value={receiptFormData.receiptNumber !== null ? receiptFormData.receiptNumber : ''}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('mobileNumber')}</div>
      </FormControl>

      {/* Amount */}
      <FormControl position="relative">
        <FormLabel>Amount</FormLabel>
        <Input type="number" name="amount" value={receiptFormData.amount} onChange={handleChange} />
      </FormControl>

      {/* Mode of Payment */}
      <FormControl position="relative">
        <FormLabel>Mode of Payment</FormLabel>
        <Select name="modeOfPayment" placeholder="Select mode of payment" defaultValue={ModeOfPayment.cash} onChange={handleChange}>
          <option value={ModeOfPayment.cash}>Cash</option>
          <option value={ModeOfPayment.cheque}>Cheque</option>
          <option value={ModeOfPayment.online}>Online</option>
        </Select>
      </FormControl>

      {/* Mobile */}
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

      {/* Aadhar Number */}
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

      {/* PAN Number */}
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

      {/* Financial Year */}
      <FormControl position={'relative'}>
        <FormLabel>Financial Year</FormLabel>
        <Input type="string" name="financialYear" placeholder="2023-2024" value={receiptFormData.financialYear} onChange={handleChange} />
      </FormControl>

      {/* Address */}
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
        <Button colorScheme="green" size="md" disabled={loading} onClick={handleUpdateReceiptClick}>
          Save
        </Button>
        <Button colorScheme="red" size="md">
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
