import { Receipt, ReceiptBook } from './generated/graphql';

export interface ClientReceipt extends Omit<Receipt, 'receiptBook'> {
  // Omit the receiptBook from the client-side Receipt type
}

export interface ClientReceiptBook extends Omit<ReceiptBook, 'receipts'> {
  // Override the receipts to use the ClientReceipt type
  receipts?: Array<ClientReceipt | null> | null;
}
