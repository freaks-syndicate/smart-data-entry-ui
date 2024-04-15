import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Stack, Switch, Textarea, useToast } from '@chakra-ui/react';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import { useSpeechToText } from '@/hooks/useSpeechToText';
import { updateFormData } from '@/utils/functions/form-helper';
import { validateCreateReceiptFormData } from '@/utils/functions/form-validations';
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
    cancelled: false,
  };

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
  const [receiptFormData, setReceiptFormData] = useState<CreateReceipt>(INITIAL_RECEIPT_FORM_DATA);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCreateReceiptClick = () => {
    const formErrors = validateCreateReceiptFormData(receiptFormData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    createReceiptMutation({
      variables: { item: receiptFormData },
      onCompleted: handleCreateReceiptCompletion,
      onError: (apiError) => {
        // You can refine this by checking apiError.graphQLErrors and apiError.networkError
        const message = apiError.message || 'An error occurred while creating the receipt.';
        toast({
          title: 'Error',
          description: message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
      },
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
    if (isListening && activeField !== null) {
      // Determine the type of the active field for validation
      let fieldType = 'text'; // Default to text if not a special case
      if (activeField === 'receiptNumber' || activeField === 'amount') {
        fieldType = 'number';
      } else if (activeField === 'date') {
        fieldType = 'date';
      }
      // Use the utility function to update the form data with validation
      const updatedFormData = updateFormData(receiptFormData, activeField as keyof CreateReceipt, transcript, fieldType);
      setReceiptFormData(updatedFormData);
    }
  }, [transcript, isListening, activeField, receiptFormData]);

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

  useEffect(
    () => () => {
      stopListening();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (createReceiptError) {
    // TODO: Gracefully handle error
    console.error(createReceiptError);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target as { name: keyof CreateReceipt; value: string; type: string };

    if (type === 'checkbox') {
      const isChecked = (event.target as HTMLInputElement).checked;
      setReceiptFormData((prev) => ({ ...prev, [name]: isChecked }));
    } else {
      // Handle other input types (text, textarea, select)
      setReceiptFormData((prev) => updateFormData<CreateReceipt>(prev, name, value, type));
    }
  };

  const handleSpeechClick = (fieldName: string) => {
    if (isListening) {
      if (activeField === fieldName) {
        stopListening(); // Stop listening if the current active field's mic icon is clicked
      } else {
        // If another field's mic icon is clicked, switch the active field
        setActiveField(fieldName);
        // No need to call stopListening or startListening since it's already listening
      }
    } else {
      if (fieldName === 'name' || fieldName === 'address') {
        setSpeechLanguage('mr-IN');
      } else {
        setSpeechLanguage('en-US');
      }
      startListening();
      setActiveField(fieldName); // Set the new active field and start listening
    }
  };

  const renderSpeechIcon = (fieldName: string) => (
    <Button onClick={() => handleSpeechClick(fieldName)} size="sm" variant="ghost">
      {isListening && activeField === fieldName ? <AudioOutlined /> : <AudioMutedOutlined />}
    </Button>
  );

  const reset = () => {
    setReceiptFormData(INITIAL_RECEIPT_FORM_DATA);
    setErrors({});
  };

  if (createReceiptError) {
    console.error(createReceiptError);
  }

  return (
    <Stack spacing={2} direction="column" align="center" className={cx(styles['d-container'])}>
      {/* Date */}
      <FormControl isInvalid={Boolean(errors.date)}>
        <FormLabel>Date</FormLabel>
        <Input type="date" name="date" value={receiptFormData.date.split('T')[0]} onChange={handleChange} />
        {errors.date && <FormErrorMessage>{errors.date}</FormErrorMessage>}
      </FormControl>

      {/* Name */}
      <FormControl position="relative" isRequired isInvalid={Boolean(errors.name)}>
        <FormLabel>Name</FormLabel>
        <Input type="text" name="name" value={receiptFormData.name} onChange={handleChange} />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('name')}</div>
        {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
      </FormControl>

      {/* Receipt Number */}
      <FormControl position="relative" isRequired isInvalid={Boolean(errors.receiptNumber)}>
        <FormLabel>Receipt Number</FormLabel>
        <Input
          type="number"
          name="receiptNumber"
          maxLength={10}
          min={1}
          value={receiptFormData.receiptNumber !== null ? receiptFormData.receiptNumber : ''}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('receiptNumber')}</div>
        {errors.receiptNumber && <FormErrorMessage>{errors.receiptNumber}</FormErrorMessage>}
      </FormControl>

      {/* Amount */}
      <FormControl position="relative" isRequired isInvalid={Boolean(errors.amount)}>
        <FormLabel>Amount</FormLabel>
        <Input type="number" name="amount" min={1} value={receiptFormData.amount} onChange={handleChange} />
        {errors.amount && <FormErrorMessage>{errors.amount}</FormErrorMessage>}
      </FormControl>

      {/* Mode of Payment */}
      <FormControl position="relative" isRequired isInvalid={Boolean(errors.modeOfPayment)}>
        <FormLabel>Mode of Payment</FormLabel>
        <Select name="modeOfPayment" placeholder="Select mode of payment" defaultValue={ModeOfPayment.Cash} onChange={handleChange}>
          <option value={ModeOfPayment.Cash}>Cash</option>
          <option value={ModeOfPayment.Cheque}>Cheque</option>
          <option value={ModeOfPayment.Online}>Online</option>
        </Select>
        {errors.modeOfPayment && <FormErrorMessage>{errors.modeOfPayment}</FormErrorMessage>}
      </FormControl>

      {/* Mobile */}
      <FormControl position="relative" isInvalid={Boolean(errors.mobileNumber)}>
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
        {errors.mobileNumber && <FormErrorMessage>{errors.mobileNumber}</FormErrorMessage>}
      </FormControl>

      {/* TODO: Add a toggle to either input Aadhar or PAN and store it as itemCode */}
      {/* Aadhar Number */}
      <FormControl position="relative" isInvalid={Boolean(errors.aadharNumber)}>
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
        {errors.aadharNumber && <FormErrorMessage>{errors.aadharNumber}</FormErrorMessage>}
      </FormControl>

      {/* PAN Number */}
      <FormControl position="relative" isInvalid={Boolean(errors.panNumber)}>
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
        {errors.panNumber && <FormErrorMessage>{errors.panNumber}</FormErrorMessage>}
      </FormControl>

      {/* Financial Year */}
      <FormControl position={'relative'} isInvalid={Boolean(errors.financialYear)}>
        <FormLabel>Financial Year</FormLabel>
        <Input
          type="string"
          name="financialYear"
          placeholder="E.g. 2023-2024"
          value={receiptFormData.financialYear ?? ''}
          onChange={handleChange}
        />
        {errors.financialYear && <FormErrorMessage>{errors.financialYear}</FormErrorMessage>}
      </FormControl>

      {/* Address */}
      <FormControl position="relative" isInvalid={Boolean(errors.address)}>
        <FormLabel>Address</FormLabel>
        <Textarea
          name="address"
          rows={4}
          value={receiptFormData.address ?? ''}
          onChange={handleChange}
          placeholder="Enter your address here..."
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('address')}</div>
        {errors.address && <FormErrorMessage>{errors.address}</FormErrorMessage>}
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="cancelled-receipt-switch" mb="0">
          Cancelled?
        </FormLabel>
        <Switch
          colorScheme="red"
          size="md"
          name="cancelled"
          id="cancelled-receipt-switch"
          isChecked={receiptFormData.cancelled ?? false}
          onChange={handleChange}
          data-cy="cancelled-switch"
        />
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
