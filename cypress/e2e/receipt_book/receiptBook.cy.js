import { createReceiptBook, editReceiptBook, searchReceiptBook, deleteReceiptBook } from './functions/receiptBookOperations';
import { createReceipt, deleteReceipt, editReceipt, searchReceipt } from './functions/receiptOperations';

describe('Receipt book and receipt operations', () => {
  beforeEach(() => {
    cy.loginWithUsername(); // Custom command to login
  });

  context('Receipt Book Operations', () => {
    const receiptBookNumber = '111222';
    const newReceiptBookNumber = '1112221';
    const financialYear2023 = '2023-2024';

    it('should create a receipt book', () => {
      createReceiptBook(receiptBookNumber, 1, 5, financialYear2023);
    });

    it('should search for a receipt book by number', () => {
      searchReceiptBook(receiptBookNumber);
    });

    it('should edit a receipt book', () => {
      editReceiptBook(newReceiptBookNumber, 1, 1, '2001-2002', receiptBookNumber);
    });
  });

  context('Receipt Operations', () => {
    const newReceiptBookNumber = '1112221';
    const name = 'Lorem Ipsum';
    const newName = 'Lorem Ipsum Doe';
    const financialYear2023 = '2023-2024';

    it('should create a receipt', () => {
      createReceipt(
        newReceiptBookNumber,
        name,
        11,
        2000,
        'Cheque',
        9191919191,
        202029282726,
        'ABCDE1234F',
        financialYear2023,
        'A 23, Sambhaji Nagar, Pune 411067',
      );
    });

    it('should search for a receipt by name', () => {
      searchReceipt(name, newReceiptBookNumber);
    });

    it('should edit a receipt', () => {
      editReceipt(newReceiptBookNumber, '11', newName, 2, 3000, 'Online', 7, 'ABCDE1234G', '2024-2025', 'Pune 411067');
    });

    it('should delete a receipt', () => {
      deleteReceipt(newName, newReceiptBookNumber);
    });

    it('should delete a receipt book', () => {
      deleteReceiptBook(newReceiptBookNumber);
    });
  });

  after(() => {
    cy.logout(); // Custom command to log out
  });
});
