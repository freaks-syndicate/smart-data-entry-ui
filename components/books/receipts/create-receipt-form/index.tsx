import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import { Button, FormControl, FormLabel, Input, Select, Stack, Textarea, useToast } from '@chakra-ui/react';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import { useSpeechToText } from '@/hooks/useSpeechToText';
import { updateFormData } from '@/utils/functions/form-helper';
import { CreateReceipt, ModeOfPayment, ReceiptBookDocument, useCreateReceiptMutation } from '@/utils/types/generated/graphql';

import styles from './create-receipt-form.module.scss';

export interface ICreateReceiptFormProps {
  receiptBookId: string;
}

export default function CreateReceiptForm(props: ICreateReceiptFormProps) {
  const { receiptBookId } = props;

  const INITIAL_RECEIPT_FORM_DATA: CreateReceipt = {
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

  const [receiptFormData, setReceiptFormData] = useState<CreateReceipt>(INITIAL_RECEIPT_FORM_DATA);

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    // error,
    setSpeechLanguage,
  } = useSpeechToText();
  const toast = useToast();

  const [createReceiptMutation, { loading, error: createReceiptError }] = useCreateReceiptMutation();

  const [realTimeTranscript, setRealTimeTranscript] = useState('');
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleCreateReceiptClick = () => {
    createReceiptMutation({
      variables: { item: receiptFormData },
      onCompleted: handleCreateReceiptCompletion,
      refetchQueries: [
        {
          query: ReceiptBookDocument,
          variables: {
            where: { id: receiptBookId },
          },
        },
      ],
    });
  };

  const handleCreateReceiptCompletion = () => {
    toast({
      title: 'Receipt Created',
      description: 'You have successfully created a new receipt.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom-left',
    });

    reset();
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

  useEffect(() => {
    const numberInputs = document.querySelectorAll('input[type=number]');
    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    numberInputs.forEach((input) => {
      input.addEventListener('wheel', preventScroll as EventListener);
    });

    return () => {
      numberInputs.forEach((input) => {
        input.removeEventListener('wheel', preventScroll as EventListener);
      });
    };
  }, []);

  if (createReceiptError) {
    // TODO: Gracefully handle error
    console.error(createReceiptError);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target as { name: keyof CreateReceipt; value: string; type: string };
    setReceiptFormData((prev) => updateFormData<CreateReceipt>(prev, name, value, type));
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
        <Input type="text" name="name" value={receiptFormData.name} onChange={handleChange} />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('name')}</div>
      </FormControl>

      {/* Receipt Number */}
      <FormControl position="relative" isRequired>
        <FormLabel>Receipt Number</FormLabel>
        <Input
          type="number"
          name="receiptNumber"
          maxLength={10}
          min={1}
          value={receiptFormData.receiptNumber !== null ? receiptFormData.receiptNumber : ''}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('mobileNumber')}</div>
      </FormControl>

      {/* Amount */}
      <FormControl position="relative" isRequired>
        <FormLabel>Amount</FormLabel>
        <Input type="number" name="amount" min={1} value={receiptFormData.amount} onChange={handleChange} />
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
          pattern="^[6-9]\d{9}$"
          inputMode="numeric"
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
