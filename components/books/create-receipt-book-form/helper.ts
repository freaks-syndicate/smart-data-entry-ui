import { CreateReceiptBook, UpdateReceiptBook } from '@/utils/types/generated/graphql';

export const validateCreateReceiptBookFormData = (data: CreateReceiptBook | UpdateReceiptBook): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (data.receiptBookNumber && data.receiptBookNumber <= 0) {
    errors.receiptBookNumber = 'Receipt book number must be greater than 0';
  }
  if (data.receiptSeries && data.receiptSeries <= 0) {
    errors.receiptSeries = 'Receipt series must be greater than 0';
  }
  if (data.totalReceipts && data.totalReceipts <= 0) {
    errors.totalReceipts = 'Total receipts must be greater than 0';
  }
  if (data.financialYear && data.financialYear.trim() && !/^\d{4}-\d{4}$/.test(data.financialYear.trim())) {
    errors.financialYear = 'Financial year must be in the format "YYYY-YYYY"';
  }

  return errors;
};
