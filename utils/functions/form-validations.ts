import { CreateReceipt, CreateReceiptBook, UpdateReceipt, UpdateReceiptBook } from '@/utils/types/generated/graphql';

export const validateCreateReceiptBookFormData = (data: CreateReceiptBook | UpdateReceiptBook): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (data.receiptBookNumber !== null && data.receiptBookNumber !== undefined && data.receiptBookNumber <= 0) {
    errors.receiptBookNumber = 'Receipt book number must be greater than 0';
  }
  if (data.receiptSeries !== null && data.receiptSeries !== undefined && data.receiptSeries <= 0) {
    errors.receiptSeries = 'Receipt series must be greater than 0';
  }
  if (data.totalReceipts !== null && data.totalReceipts !== undefined && data.totalReceipts <= 0) {
    errors.totalReceipts = 'Total receipts must be greater than 0';
  }
  if (
    data.financialYear !== null &&
    data.financialYear !== undefined &&
    data.financialYear.trim() &&
    !/^\d{4}-\d{4}$/.test(data.financialYear.trim())
  ) {
    errors.financialYear = 'Financial year must be in the format "YYYY-YYYY"';
  }

  return errors;
};

export const validateCreateReceiptFormData = (data: CreateReceipt | UpdateReceipt): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  // Ensure that name field is not empty
  if (data.name === null || data.name === undefined || data.name.trim() === '') {
    errors.name = 'Name is required';
  }

  // Ensure the receipt number is a positive number
  if (data.receiptNumber !== null && data.receiptNumber !== undefined && data.receiptNumber <= 0) {
    errors.receiptNumber = 'Receipt number must be greater than 0';
  }
  // Validate the amount to be a positive number
  if (data.amount !== null && data.amount !== undefined && data.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }
  // Optional: Check financial year format if not empty
  if (data.financialYear?.trim() && !/^\d{4}-\d{4}$/.test(data.financialYear.trim())) {
    errors.financialYear = 'Financial year must be in the format "YYYY-YYYY"';
  }
  // Validate mobile number format if provided
  if (data.mobileNumber !== null && data.mobileNumber !== undefined && !/^[6-9]\d{9}$/.test(data.mobileNumber)) {
    errors.mobileNumber = 'Mobile number must start with 6-9 and be 10 digits long';
  }
  // Validate PAN number format if provided
  if (data.panNumber?.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.panNumber.trim())) {
    errors.panNumber = 'PAN number must be in the format "ABCDE1234F"';
  }
  // Validate Aadhar number format if provided
  if (data.aadharNumber !== null && data.aadharNumber !== undefined && data.aadharNumber.length !== 12) {
    errors.aadharNumber = 'Aadhar number must be exactly 12 digits';
  }

  return errors;
};
