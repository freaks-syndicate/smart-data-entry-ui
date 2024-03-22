import { Button, FormControl, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import cx from 'classnames';

import { filterNonNullFields } from '@/utils/functions/filter-non-null-fields';
import { UpdateReceiptBookMutationVariables, useUpdateReceiptBookMutation } from '@/utils/types/generated/graphql';

import styles from './update-receipt-book-form.module.scss';

export interface IUpdateReceiptBookFormProps {
  receiptBookId: string;
  receiptBookFormData: UpdateReceiptBookMutationVariables['item'];
  setReceiptBookFormData: React.Dispatch<React.SetStateAction<UpdateReceiptBookMutationVariables['item']>>;
  reset: () => void;
}

export default function UpdateReceiptBookForm(props: IUpdateReceiptBookFormProps) {
  const { receiptBookId, receiptBookFormData, setReceiptBookFormData, reset } = props;

  const toast = useToast();

  const [updateReceiptBookMutation, { loading, error: updateReceiptBookError }] = useUpdateReceiptBookMutation();

  const handleReceiptBookCompletion = () => {
    toast({
      title: 'Receipt Book Updated',
      description: 'You have successfully updated the receipt book.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom-left',
    });

    reset();
  };

  const handleUpdateReceiptBookClick = () => {
    // TODO: Handle various errors
    const payload = filterNonNullFields(receiptBookFormData);
    updateReceiptBookMutation({
      variables: { updateReceiptBookId: receiptBookId, item: payload },
      onCompleted: handleReceiptBookCompletion,
    });
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

  if (updateReceiptBookError) {
    console.error(updateReceiptBookError);
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
        <Input type="number" name="receiptSeries" value={receiptBookFormData.receiptSeries ?? 0} onChange={handleChange} />
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
          value={receiptBookFormData.financialYear ?? ''}
          onChange={handleChange}
        />
      </FormControl>

      <Stack spacing={4} direction="row" width="100%" justifyContent="flex-end">
        <Button colorScheme="green" size="md" disabled={loading} onClick={handleUpdateReceiptBookClick}>
          Update
        </Button>
        <Button colorScheme="red" size="md">
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
