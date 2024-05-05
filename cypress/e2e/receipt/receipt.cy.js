import { deleteReceiptBook } from '../receipt_book/functions/deleteReceiptBook';
import { createReceipt } from './functions/createReceipt';
import { deleteReceipt } from './functions/deleteReceipt';
import { editReceipt } from './functions/editReceipt';
import { searchReceipt } from './functions/searchReceipt';

describe('Receipt operations', () => {
  before('Login with username', () => {
    cy.loginWithUsername(); // Custom command to login
  });

  it('Create, search, edit, delete receipt', () => {
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
