import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import { Button, FormControl, FormLabel, Input, Select, Stack, Textarea } from '@chakra-ui/react';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import { useSpeechToText } from '@/hooks/useSpeechToText';
import { CreateReceiptMutationVariables, ModeOfPayment, ReceiptsDocument, useCreateReceiptMutation } from '@/utils/types/generated/graphql';

import styles from './create-receipt-form.module.scss';

export interface ICreateReceiptFormProps {
  receiptBookId: string;
}

export default function CreateReceiptForm(props: ICreateReceiptFormProps) {
  const { receiptBookId } = props;

  const INITIAL_RECEIPT_FORM_DATA: CreateReceiptMutationVariables['item'] = {
    receiptNumber: 0,
    name: '',
    financialYear: '',
    date: new Date().toISOString(),
    mobileNumber: undefined,
    address: '',
    amount: 0.0,
    aadharNumber: undefined,
    panNumber: '',
    modeOfPayment: ModeOfPayment.Cash,
    receiptBookId: receiptBookId,
  };

  const [receiptFormData, setReceiptFormData] = useState<CreateReceiptMutationVariables['item']>(INITIAL_RECEIPT_FORM_DATA);

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    // error,
    setSpeechLanguage,
  } = useSpeechToText();

  const [createReceiptMutation, { loading, error: createReceiptError }] = useCreateReceiptMutation();

  const handleCreateReceiptClick = () => {
    createReceiptMutation({
      variables: { item: receiptFormData },
      refetchQueries: [{ query: ReceiptsDocument, variables: { paginate: { page: 0, pageSize: 10 } } }],
    });
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

  if (createReceiptError) {
    // TODO: Gracefully handle error
    console.error(createReceiptError);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    setReceiptFormData((prev) => {
      if (name === 'date') {
        // Parse the input string to a Date object
        const dateValue = new Date(value);
        return { ...prev, [name]: dateValue.toISOString() };
      } else if (type === 'number') {
        return { ...prev, [name]: +value };
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

  const reset = () => setReceiptFormData(INITIAL_RECEIPT_FORM_DATA);

  if (createReceiptError) {
    console.error(createReceiptError);
  }

  return (
    <Stack spacing={2} direction="column" align="center" className={cx(styles['d-container'])}>
      {/* Date */}
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input type="date" name="date" value={receiptFormData.date.split('T')[0]} onChange={handleChange} />
      </FormControl>

      {/* Name */}
      <FormControl position="relative" isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="test" name="name" value={receiptFormData.name} onChange={handleChange} />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('name')}</div>
      </FormControl>

      {/* Receipt Number */}
      <FormControl position="relative" isRequired>
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
      <FormControl position="relative" isRequired>
        <FormLabel>Amount</FormLabel>
        <Input type="number" name="amount" value={receiptFormData.amount} onChange={handleChange} />
      </FormControl>

      {/* Mode of Payment */}
      <FormControl position="relative" isRequired>
        <FormLabel>Mode of Payment</FormLabel>
        <Select name="modeOfPayment" placeholder="Select mode of payment" defaultValue={ModeOfPayment.Cash} onChange={handleChange}>
          <option value={ModeOfPayment.Cash}>Cash</option>
          <option value={ModeOfPayment.Cheque}>Cheque</option>
          <option value={ModeOfPayment.Online}>Online</option>
        </Select>
      </FormControl>

      {/* Mobile */}
      <FormControl position="relative">
        <FormLabel>Mobile</FormLabel>
        <Input
          type="string"
          name="mobileNumber"
          maxLength={10}
          value={receiptFormData.mobileNumber !== null ? receiptFormData.mobileNumber : ''}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('mobileNumber')}</div>
      </FormControl>

      {/* TODO: Add a toggle to either input Aadhar or PAN and store it as itemCode */}
      {/* Aadhar Number */}
      <FormControl position="relative">
        <FormLabel>Aadhar Number</FormLabel>
        <Input
          type="string"
          name="aadharNumber"
          placeholder="E.g. 123412341234"
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
          placeholder="E.g. ABCDE1234R"
          maxLength={10}
          value={receiptFormData.panNumber ?? undefined}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('panNumber')}</div>
      </FormControl>

      {/* Financial Year */}
      <FormControl position={'relative'}>
        <FormLabel>Financial Year</FormLabel>
        <Input
          type="string"
          name="financialYear"
          placeholder="E.g. 2023-2024"
          value={receiptFormData.financialYear ?? ''}
          onChange={handleChange}
        />
      </FormControl>

      {/* Address */}
      <FormControl position="relative">
        <FormLabel>Address</FormLabel>
        <Textarea
          name="address"
          rows={4}
          value={receiptFormData.address ?? ''}
          onChange={handleChange}
          placeholder="Enter your address here..."
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('address')}</div>
      </FormControl>

      <Stack spacing={4} direction="row" width="100%" justifyContent="flex-end">
        <Button colorScheme="green" size="md" disabled={loading} onClick={handleCreateReceiptClick}>
          Save
        </Button>
        <Button colorScheme="red" size="md" onClick={reset}>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
