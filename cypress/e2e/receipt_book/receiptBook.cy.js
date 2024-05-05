import { createReceiptBook } from './functions/createReceiptBook';
import { editReceiptBook } from './functions/editReceiptBook';
import { searchReceiptBook } from './functions/searchReceiptBook';
import { deleteReceiptBook } from './functions/deleteReceiptBook';
import { createReceipt } from './functions/createReceipt';
import { deleteReceipt } from './functions/deleteReceipt';
import { editReceipt } from './functions/editReceipt';
import { searchReceipt } from './functions/searchReceipt';

describe('Receipt book and receipt operations', () => {
  before('Login with username', () => {
    cy.loginWithUsername(); // Custom command to login
  });

  it('Create, search, edit receipt book and receipts', () => {
    createReceiptBook(111222, 1, 5, '2023-2024'); // receiptBookNumber, receiptSeriesNumber, totalReceipts, financialYear

    searchReceiptBook(111222); // receiptBookNumber

    editReceiptBook(1, 1, 1, '2001-2002', '111222'); // receiptBookNumber, receiptSeries, totalReceipts, financialYear, oldReceiptBookNumber

    createReceipt(
      '1112221', // receiptBookNumber
      'Lorem Ipsum', // name
      11, // receiptNumber
      2000, // amount
      'Cheque', // modeOfPayment
      9191919191, // mobile
      202029282726, // aadharNumber
      'ABCDE1234F', // panNumber
      '2023-2024', // year
      'A 23, Sambhaji Nagar, Pune 411067', // address
    );

    searchReceipt('Lorem Ipsum');

    editReceipt(' Doe', 2, 3000, 'Online', 7, 'ABCDE1234G', '2024-2025', 'Pune 411067');

    deleteReceipt('Lorem Ipsum Doe');

    deleteReceiptBook('1112221');
  });

  after('Logout', () => {
    cy.logout(); // Custom command to log out
  });
});
