import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import { updateFormData } from '@/utils/functions/form-helper';
import { validateCreateReceiptBookFormData } from '@/utils/functions/form-validations';
import { CreateReceiptBook, ReceiptBooksDocument, useCreateReceiptBookMutation } from '@/utils/types/generated/graphql';

import styles from './create-receipt-book-form.module.scss';

export interface ICreateReceiptBookFormProps {}

export default function CreateReceiptBookForm(_props: ICreateReceiptBookFormProps) {
  const INITIAL_RECEIPT_BOOK_FORM_DATA: CreateReceiptBook = {
    receiptBookNumber: 0,
    financialYear: '',
    receiptSeries: 0,
    totalReceipts: 0,
  };

  const toast = useToast();
  const [receiptBookFormData, setReceiptBookFormData] = useState<CreateReceiptBook>(INITIAL_RECEIPT_BOOK_FORM_DATA);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [createReceiptBookMutation, { loading, error: createReceiptBookError }] = useCreateReceiptBookMutation();

  const reset = () => {
    setReceiptBookFormData(INITIAL_RECEIPT_BOOK_FORM_DATA);
    setErrors({});
  };

  const handleCreateReceiptBookClick = () => {
    const formErrors = validateCreateReceiptBookFormData(receiptBookFormData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    createReceiptBookMutation({
      variables: { item: receiptBookFormData },
      onCompleted: handleReceiptBookCompletion,
      onError: (apiError) => {
        // You can refine this by checking apiError.graphQLErrors and apiError.networkError
        const message = apiError.message || 'An error occurred while creating the receipt book.';
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
          query: ReceiptBooksDocument,
          variables: { paginate: { page: 0, pageSize: 10 } },
        },
      ],
    });
  };

  const handleReceiptBookCompletion = () => {
    toast({
      title: 'Receipt Book Created',
      description: 'You have successfully created a new receipt book.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom-left',
    });

    reset();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target as { name: keyof CreateReceiptBook; value: string; type: string };
    setReceiptBookFormData((prev) => updateFormData<CreateReceiptBook>(prev, name, value, type));
  };

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

  if (createReceiptBookError) {
    console.error(createReceiptBookError);
  }

  return (
    <Stack spacing={2} direction="column" align="center" className={cx(styles['d-container'])}>
      {/* Receipt Book Number */}
      <FormControl position="relative" isRequired isInvalid={Boolean(errors.receiptBookNumber)}>
        <FormLabel>Receipt Book Number</FormLabel>
        <Input
          type="number"
          name="receiptBookNumber"
          maxLength={10}
          min={1}
          value={receiptBookFormData.receiptBookNumber !== null ? receiptBookFormData.receiptBookNumber : ''}
          onChange={handleChange}
        />
        {errors.receiptBookNumber && <FormErrorMessage>{errors.receiptBookNumber}</FormErrorMessage>}
        {/* <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('mobileNumber')}</div> */}
      </FormControl>

      {/* Receipt Series */}
      <FormControl position="relative" isRequired isInvalid={Boolean(errors.receiptSeries)}>
        <FormLabel>Receipt Series</FormLabel>
        <Input type="number" name="receiptSeries" min={1} value={receiptBookFormData.receiptSeries} onChange={handleChange} />
        {errors.receiptSeries && <FormErrorMessage>{errors.receiptSeries}</FormErrorMessage>}
      </FormControl>

      {/* Total Receipts */}
      <FormControl position="relative" isRequired isInvalid={Boolean(errors.totalReceipts)}>
        <FormLabel>Total Receipts</FormLabel>
        <Input
          type="number"
          name="totalReceipts"
          min={1}
          value={receiptBookFormData.totalReceipts !== null ? receiptBookFormData.totalReceipts : ''}
          onChange={handleChange}
        />
        {errors.totalReceipts && <FormErrorMessage>{errors.totalReceipts}</FormErrorMessage>}
        {/* <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('mobileNumber')}</div> */}
      </FormControl>

      {/* Financial Year */}
      <FormControl position={'relative'} isInvalid={Boolean(errors.financialYear)}>
        <FormLabel>Financial Year</FormLabel>
        <Input
          type="string"
          name="financialYear"
          placeholder="2023-2024"
          value={receiptBookFormData?.financialYear ?? ''}
          onChange={handleChange}
        />
        {errors.financialYear && <FormErrorMessage>{errors.financialYear}</FormErrorMessage>}
      </FormControl>

      <Stack spacing={4} direction="row" width="100%" justifyContent="flex-end">
        <Button colorScheme="green" size="md" disabled={loading} onClick={handleCreateReceiptBookClick} data-cy="save-button">
          Save
        </Button>
        <Button colorScheme="red" size="md" onClick={reset} data-cy="reset-button">
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
