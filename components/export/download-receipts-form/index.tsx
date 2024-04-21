import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import cx from 'classnames';
import { useState } from 'react';

import { API_DOMAIN } from '@/constants';
import { updateFormData } from '@/utils/functions/form-helper';

import styles from './download-receipts-form.module.scss';

export interface IDownloadReceiptsFormProps {}
interface DownloadReceipts {
  startDate: string;
  endDate: string;
}

export default function DownloadReceiptsForm(_props: IDownloadReceiptsFormProps) {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 6);

  const INITIAL_FORM_DATA = {
    startDate: currentDate.toISOString(),
    endDate: new Date().toISOString(),
  };

  const [receiptFormData, setReceiptFormData] = useState<DownloadReceipts>(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target as { name: keyof DownloadReceipts; value: string; type: string };

    setReceiptFormData((prev) => updateFormData<DownloadReceipts>(prev, name, value, type));
  };

  const handleDownloadReceiptsClick = () => {
    setLoading(true);
    fetch(
      `${API_DOMAIN}/api/v1/receipts/download-excel?startDate=${receiptFormData.startDate.split('T')[0]}&endDate=${receiptFormData.endDate.split('T')[0]}`,
    )
      .then((response) => response.blob())
      .then((blob) => {
        // Create a new URL for the blob
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const startDateString =
          new Date(receiptFormData.startDate).getDate() +
          '-' +
          (new Date(receiptFormData.startDate).getMonth() + 1) +
          '-' +
          new Date(receiptFormData.startDate).getFullYear();
        const endDateString =
          new Date(receiptFormData.endDate).getDate() +
          '-' +
          (new Date(receiptFormData.endDate).getMonth() + 1) +
          '-' +
          new Date(receiptFormData.endDate).getFullYear();
        a.download = `receipts-${startDateString}-${endDateString}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove(); // After downloading remove the link
        window.URL.revokeObjectURL(url); // Clean up the URL
      })
      .catch((err) => console.error('Download failed', err))
      .finally(() => setLoading(false));
  };

  const reset = () => {
    setReceiptFormData(INITIAL_FORM_DATA);
    setErrors({});
  };

  return (
    <Stack spacing={2} direction="column" align="center" className={cx(styles['d-container'])}>
      <FormControl isInvalid={Boolean(errors.date)}>
        <FormLabel>Date</FormLabel>
        <Input type="date" name="startDate" value={receiptFormData.startDate.split('T')[0]} onChange={handleChange} />
        {errors.date && <FormErrorMessage>{errors.date}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={Boolean(errors.date)}>
        <FormLabel>Date</FormLabel>
        <Input type="date" name="endDate" value={receiptFormData.endDate.split('T')[0]} onChange={handleChange} />
        {errors.date && <FormErrorMessage>{errors.date}</FormErrorMessage>}
      </FormControl>

      <Stack spacing={4} direction="row" width="100%" justifyContent="flex-end">
        <Button colorScheme="green" size="md" disabled={loading} onClick={handleDownloadReceiptsClick}>
          Download
        </Button>
        <Button colorScheme="red" size="md" onClick={reset}>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
