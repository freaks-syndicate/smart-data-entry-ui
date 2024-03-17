import { useMutation } from '@apollo/client';
import { Button, FormControl, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import cx from 'classnames';

import { CREATE_RECEIPT_BOOK } from '@/queries/receipt-book/create-receipt-book';
import { ICreateReceiptBookArgs, ICreateReceiptBookResponse } from '@/utils/types/query-response.types';

import styles from './create-receipt-book-form.module.scss';

export interface ICreateReceiptBookFormProps {
  receiptBookFormData: ICreateReceiptBookArgs['item'];
  setReceiptBookFormData: React.Dispatch<React.SetStateAction<ICreateReceiptBookArgs['item']>>;
  reset: () => void;
}

export default function CreateReceiptBookForm(props: ICreateReceiptBookFormProps) {
  const { receiptBookFormData, setReceiptBookFormData, reset } = props;

  const toast = useToast();

  const [createReceiptBook, { loading, error: createReceiptBookError }] = useMutation<ICreateReceiptBookResponse, ICreateReceiptBookArgs>(
    CREATE_RECEIPT_BOOK,
  );

  const handleCreateReceiptBookClick = () => {
    // TODO: Handle various errors
    createReceiptBook({ variables: { item: receiptBookFormData }, onCompleted: handleReceiptBookCompletion });
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
    const { name, value, type } = event.target;
    setReceiptBookFormData((prev) => {
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

  if (createReceiptBookError) {
    console.error(createReceiptBookError);
  }

  return (
    <Stack spacing={2} direction="column" align="center" className={cx(styles['d-container'])}>
      {/* Receipt Book Number */}
      <FormControl position="relative">
        <FormLabel>Receipt Book Number</FormLabel>
        <Input
          type="number"
          name="receiptBookNumber"
          maxLength={10}
          value={receiptBookFormData.receiptBookNumber !== null ? receiptBookFormData.receiptBookNumber : ''}
          onChange={handleChange}
        />
        {/* <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('mobileNumber')}</div> */}
      </FormControl>

      {/* Receipt Series */}
      <FormControl position="relative">
        <FormLabel>Receipt Series</FormLabel>
        <Input type="number" name="receiptSeries" value={receiptBookFormData.receiptSeries} onChange={handleChange} />
      </FormControl>

      {/* Total Receipts */}
      <FormControl position="relative">
        <FormLabel>Total Receipts</FormLabel>
        <Input
          type="number"
          name="totalReceipts"
          value={receiptBookFormData.totalReceipts !== null ? receiptBookFormData.totalReceipts : ''}
          onChange={handleChange}
        />
        {/* <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8 cursor-pointer">{renderSpeechIcon('mobileNumber')}</div> */}
      </FormControl>

      {/* Financial Year */}
      <FormControl position={'relative'}>
        <FormLabel>Financial Year</FormLabel>
        <Input
          type="string"
          name="financialYear"
          placeholder="2023-2024"
          value={receiptBookFormData.financialYear}
          onChange={handleChange}
        />
      </FormControl>

      <Stack spacing={4} direction="row" width="100%" justifyContent="flex-end">
        <Button colorScheme="green" size="md" disabled={loading} onClick={handleCreateReceiptBookClick}>
          Save
        </Button>
        <Button colorScheme="red" size="md">
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
