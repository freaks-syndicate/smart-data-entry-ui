import { createReceiptBook, editReceiptBook, searchReceiptBook, deleteReceiptBook } from './functions/receiptBookOperations';
import { createReceipt, deleteReceipt, editReceipt, searchReceipt } from './functions/receiptOperations';

describe('Receipt book and receipt operations', () => {
  beforeEach('Login with username', () => {
    cy.loginWithUsername(); // Custom command to login
  });

  // receipt book operations
  it('should create a receipt book', () => {
    createReceiptBook(111222, 1, 5, '2023-2024'); // Arguments are receiptBookNumber, receiptSeriesNumber, totalReceipts, financialYear
  });

  it('should search for a receipt book by number', () => {
    searchReceiptBook(111222); // Argument is receiptBookNumber
  });

  it('should edit a receipt book', () => {
    editReceiptBook(
      1, // newReceiptBookNumber
      1, // newReceiptSeries
      1, // newTotalReceipts
      '2001-2002', // newFinancialYear
      '111222', // oldReceiptBookNumber
    );
  });

  // receipt operations
  it('should create a receipt', () => {
    createReceipt(
      '1112221', // newReceiptBookNumber
      'Lorem Ipsum', // name
      11, // receiptNumber
      2000, // amount
      'Cheque', // modeOfPayment
      9191919191, // mobile
      202029282726, // aadharNumber
      'ABCDE1234F', // panNumber
      '2023-2024', // financialYear
      'A 23, Sambhaji Nagar, Pune 411067', // address
    );
  });

  it('should search for a receipt by name', () => {
    searchReceipt('Lorem Ipsum', '1112221'); // Argument is name, newReceiptBookNumber
  });

  it('should edit a receipt', () => {
    editReceipt(
      '1112221', // newReceiptBookNumber
      '11', // receiptNumber
      'Lorem Ipsum Doe', // newName
      2, // newReceiptNumber
      3000, // newAmount
      'Online', // newModeOfPayment
      7, // newAadharNumber
      'ABCDE1234G', // newPanNumber
      '2024-2025', // newFinancialYear
      'Pune 411067', // newAddress
    );
  });

  it('should delete a receipt', () => {
    deleteReceipt('Lorem Ipsum Doe', '1112221'); // Argument is newName, newReceiptBookNumber
  });

  it('should delete a receipt book', () => {
    deleteReceiptBook(1112221); // Argument is newReceiptBookNumber
  });

  after('Logout', () => {
    cy.logout(); // Custom command to log out
  });
});
