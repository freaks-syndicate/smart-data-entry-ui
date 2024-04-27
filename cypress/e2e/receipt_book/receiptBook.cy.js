import { createReceiptBook } from './functions/createReceiptBook';
import { editReceiptBook } from './functions/editReceiptBook';
import { searchReceiptBook } from './functions/searchReceiptBook';

describe('Receipt book operations', () => {
  before('Login with username', () => {
    cy.loginWithUsername(); // Custom command to login
  });

  it('Create, search, edit receipt book', () => {
    createReceiptBook(111222, 1, 5, '2023-2024'); // receiptBookNumber, receiptSeriesNumber, totalReceipts, financialYear
    searchReceiptBook(111222); // receiptBookNumber
    editReceiptBook(1, 1, 1, '2001-2002', '111222'); // receiptBookNumber, receiptSeries, totalReceipts, financialYear, oldReceiptBookNumber
  });

  after('Logout', () => {
    cy.logout(); // Custom command to log out
  });
});
