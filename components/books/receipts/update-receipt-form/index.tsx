import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Stack, Switch, Textarea, useToast } from '@chakra-ui/react';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import { useSpeechToText } from '@/hooks/useSpeechToText';
import { filterNonNullFields } from '@/utils/functions/filter-non-null-fields';
import { updateFormData } from '@/utils/functions/form-helper';
import { validateCreateReceiptFormData } from '@/utils/functions/form-validations';
import { ClientReceipt } from '@/utils/types';
import { ModeOfPayment, ReceiptBookDocument, UpdateReceipt, useUpdateReceiptMutation } from '@/utils/types/generated/graphql';

import styles from './update-receipt-form.module.scss';

export interface IUpdateReceiptFormProps {
  receipt: ClientReceipt;
  receiptBookId: string;
  onComplete: () => void;
}

export default function UpdateReceiptForm(props: IUpdateReceiptFormProps) {
  const { receipt, receiptBookId, onComplete } = props;

  const INITIAL_RECEIPT_FORM_DATA: UpdateReceipt = {
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
    cancelled: receipt.cancelled,
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
  const [receiptFormData, setReceiptFormData] = useState<UpdateReceipt>(INITIAL_RECEIPT_FORM_DATA);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleReceiptCompletion = () => {
    toast({
      title: 'Receipt Updated',
      description: 'You have successfully updated the receipt.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom-left',
    });

    reset();
    onComplete();
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
      // if (fieldName === 'name' || fieldName === 'address') {
      //   setSpeechLanguage('mr-IN');
      // } else {
      //   setSpeechLanguage('en-US');
      // }
      // FIXME: Setting english as the default language for now
      setSpeechLanguage('en-US');
      startListening();
      setActiveField(fieldName); // Set the new active field and start listening
    }
  };

  const reset = () => {
    setReceiptFormData(INITIAL_RECEIPT_FORM_DATA);
    setErrors({});
  };

  const renderSpeechIcon = (fieldName: string) => (
    <Button onClick={() => handleSpeechClick(fieldName)} size="sm" variant="ghost">
      {isListening && activeField === fieldName ? <AudioOutlined /> : <AudioMutedOutlined />}
    </Button>
  );

  const handleUpdateReceiptClick = () => {
    const formErrors = validateCreateReceiptFormData(receiptFormData);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    const payload = filterNonNullFields(receiptFormData);
    updateReceiptMutation({
      variables: { updateReceiptId: receipt.id, item: payload },
      onCompleted: handleReceiptCompletion,
      onError: (apiError) => {
        // You can refine this by checking apiError.graphQLErrors and apiError.networkError
        const message = apiError.message || 'An error occurred while updating the receipt.';
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

  useEffect(() => {
    if (isListening && activeField !== null) {
      // Determine the type of the active field for validation
      let fieldType = 'text';
      if (activeField === 'receiptNumber' || activeField === 'amount') {
        fieldType = 'number';
      } else if (activeField === 'date') {
        fieldType = 'date';
      }

      setReceiptFormData((prevFormData) => {
        // Use the utility function to create a new state
        const updatedFormData = updateFormData(prevFormData, activeField as keyof UpdateReceipt, transcript, fieldType);
        // Only update the state if there's an actual change
        // @ts-expect-error no string index signature
        if (JSON.stringify(prevFormData[activeField]) !== JSON.stringify(updatedFormData[activeField])) {
          return updatedFormData;
        }
        return prevFormData;
      });
    }
  }, [transcript, isListening, activeField]);

  // TODO: Check if this can be applied at the root level
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target as { name: keyof UpdateReceipt; value: string; type: string };

    if (type === 'checkbox') {
      const isChecked = (event.target as HTMLInputElement).checked;
      setReceiptFormData((prev) => ({ ...prev, [name]: isChecked }));
    } else {
      // Handle other input types (text, textarea, select)
      setReceiptFormData((prev) => updateFormData<UpdateReceipt>(prev, name, value, type));
    }
  };

  useEffect(
    () => () => {
      stopListening();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (updateReceiptError) {
    console.error(updateReceiptError);
  }

  return (
    <Stack spacing={2} direction="column" align="center" className={cx(styles['d-container'])}>
      {/* Date */}
      <FormControl isInvalid={Boolean(errors.date)}>
        <FormLabel>Date</FormLabel>
        <Input
          type="date"
          name="date"
          value={receiptFormData.date ? receiptFormData.date.split('T')[0] : new Date().toISOString()}
          onChange={handleChange}
        />
        {errors.date && <FormErrorMessage>{errors.date}</FormErrorMessage>}
      </FormControl>

      {/* Name */}
      <FormControl position="relative" isRequired isInvalid={Boolean(errors.name)}>
        <FormLabel>Name</FormLabel>
        <Input type="text" name="name" value={receiptFormData.name ?? ''} onChange={handleChange} />
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
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('mobileNumber')}</div>
        {errors.receiptNumber && <FormErrorMessage>{errors.receiptNumber}</FormErrorMessage>}
      </FormControl>

      {/* Amount */}
      <FormControl position="relative" isRequired isInvalid={Boolean(errors.amount)}>
        <FormLabel>Amount</FormLabel>
        <Input type="number" name="amount" min={1} value={receiptFormData.amount ?? 0} onChange={handleChange} />
        {errors.amount && <FormErrorMessage>{errors.amount}</FormErrorMessage>}
      </FormControl>

      {/* Mode of Payment */}
      <FormControl position="relative" isRequired isInvalid={Boolean(errors.modeOfPayment)}>
        <FormLabel>Mode of Payment</FormLabel>
        <Select name="modeOfPayment" placeholder="Select mode of payment" defaultValue={receipt.modeOfPayment} onChange={handleChange}>
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
          value={receiptFormData.panNumber ?? ''}
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
        <Button colorScheme="green" size="md" disabled={loading} onClick={handleUpdateReceiptClick} data-cy="save-button">
          Save
        </Button>
        <Button colorScheme="red" size="md" onClick={reset} data-cy="reset-button">
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
