import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import { filterNonNullFields } from '@/utils/functions/filter-non-null-fields';
import { updateFormData } from '@/utils/functions/form-helper';
import { ClientReceiptBook } from '@/utils/types';
import { ReceiptBookDocument, UpdateReceiptBook, useUpdateReceiptBookMutation } from '@/utils/types/generated/graphql';

import { validateCreateReceiptBookFormData } from '../create-receipt-book-form/helper';
import styles from './update-receipt-book-form.module.scss';

export interface IUpdateReceiptBookFormProps {
  receiptBookId: string;
  receiptBook: ClientReceiptBook;
}

export default function UpdateReceiptBookForm(props: IUpdateReceiptBookFormProps) {
  const { receiptBookId, receiptBook } = props;

  const INITIAL_RECEIPT_BOOK_FORM_DATA: UpdateReceiptBook = {
    receiptBookNumber: receiptBook.receiptBookNumber,
    financialYear: receiptBook.financialYear,
    receiptSeries: receiptBook.receiptSeries,
    totalReceipts: receiptBook.totalReceipts,
  };

  const toast = useToast();
  const [updateReceiptBookMutation, { loading, error: updateReceiptBookError }] = useUpdateReceiptBookMutation();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [receiptBookFormData, setReceiptBookFormData] = useState<UpdateReceiptBook>(INITIAL_RECEIPT_BOOK_FORM_DATA);

  const reset = () => {
    setReceiptBookFormData(INITIAL_RECEIPT_BOOK_FORM_DATA);
    setErrors({});
  };

  const handleReceiptBookCompletion = () => {
    toast({
      title: 'Receipt Book Updated',
      description: 'You have successfully updated the receipt book.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom-left',
    });
  };

  const handleUpdateReceiptBookClick = () => {
    const formErrors = validateCreateReceiptBookFormData(receiptBookFormData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const payload = filterNonNullFields(receiptBookFormData);
    updateReceiptBookMutation({
      variables: { updateReceiptBookId: receiptBookId, item: payload },
      refetchQueries: [
        {
          query: ReceiptBookDocument,
          variables: { where: { id: receiptBookId } },
        },
      ],
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
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target as { name: keyof UpdateReceiptBook; value: string; type: string };
    setReceiptBookFormData((prev) => updateFormData<UpdateReceiptBook>(prev, name, value, type));
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

  if (updateReceiptBookError) {
    console.error(updateReceiptBookError);
  }

  return (
    <Stack spacing={2} direction="column" align="center" className={cx(styles['d-container'])}>
      {/* Receipt Book Number */}
      <FormControl position="relative" isInvalid={Boolean(errors.receiptBookNumber)}>
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
      <FormControl position="relative" isInvalid={Boolean(errors.receiptSeries)}>
        <FormLabel>Receipt Series</FormLabel>
        <Input type="number" name="receiptSeries" min={1} value={receiptBookFormData.receiptSeries ?? 0} onChange={handleChange} />
        {errors.receiptSeries && <FormErrorMessage>{errors.receiptSeries}</FormErrorMessage>}
      </FormControl>

      {/* Total Receipts */}
      <FormControl position="relative" isInvalid={Boolean(errors.totalReceipts)}>
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
          placeholder="e.g. 2023-2024"
          value={receiptBookFormData.financialYear ?? ''}
          onChange={handleChange}
        />
        {errors.financialYear && <FormErrorMessage>{errors.financialYear}</FormErrorMessage>}
      </FormControl>

      <Stack spacing={4} direction="row" width="100%" justifyContent="flex-end">
        <Button colorScheme="green" size="md" disabled={loading} onClick={handleUpdateReceiptBookClick}>
          Update
        </Button>
        <Button colorScheme="red" size="md" onClick={reset}>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
