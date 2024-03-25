import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import { Button, FormControl, FormLabel, Input, Select, Stack, Textarea, useToast } from '@chakra-ui/react';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import { useSpeechToText } from '@/hooks/useSpeechToText';
import { filterNonNullFields } from '@/utils/functions/filter-non-null-fields';
import { ClientReceipt } from '@/utils/types';
import { ModeOfPayment, ReceiptsDocument, UpdateReceiptMutationVariables, useUpdateReceiptMutation } from '@/utils/types/generated/graphql';

import styles from './update-receipt-form.module.scss';

export interface IUpdateReceiptFormProps {
  receipt: ClientReceipt;
  receiptBookId: string;
}

export default function UpdateReceiptForm(props: IUpdateReceiptFormProps) {
  const { receipt, receiptBookId } = props;

  const INITIAL_RECEIPT_FORM_DATA: UpdateReceiptMutationVariables['item'] = {
    aadharNumber: receipt.aadharNumber,
    address: receipt.address,
    amount: receipt.amount,
    date: receipt.date,
    financialYear: receipt.financialYear,
    mobileNumber: receipt.mobileNumber,
    modeOfPayment: receipt.modeOfPayment,
    name: receipt.name,
    panNumber: receipt.panNumber,
    receiptBookId: receiptBookId,
    receiptNumber: receipt.receiptNumber,
  };

  const toast = useToast();
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    // error,
    setSpeechLanguage,
  } = useSpeechToText();
  const [updateReceiptMutation, { loading, error: updateReceiptError }] = useUpdateReceiptMutation();

  const [receiptFormData, setReceiptFormData] = useState<UpdateReceiptMutationVariables['item']>(INITIAL_RECEIPT_FORM_DATA);
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

  const reset = () => setReceiptFormData(INITIAL_RECEIPT_FORM_DATA);

  const renderSpeechIcon = (fieldName: string) => (
    <Button onClick={() => handleSpeechClick(fieldName)} size="sm" variant="ghost">
      {isListening && activeField === fieldName ? <AudioOutlined /> : <AudioMutedOutlined />}
    </Button>
  );

  const handleUpdateReceiptClick = () => {
    // TODO: Handle various errors
    const payload = filterNonNullFields(receiptFormData);
    updateReceiptMutation({
      variables: { updateReceiptId: receipt.id, item: payload },
      onCompleted: handleReceiptCompletion,
      refetchQueries: [{ query: ReceiptsDocument, variables: { paginate: { page: 0, pageSize: 10 } } }],
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
        <Input type="test" name="name" value={receiptFormData.name ?? ''} onChange={handleChange} />
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
        <Input type="number" name="amount" value={receiptFormData.amount ?? 0} onChange={handleChange} />
      </FormControl>

      {/* Mode of Payment */}
      <FormControl position="relative">
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
          value={receiptFormData.panNumber ?? ''}
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
          placeholder="2023-2024"
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
