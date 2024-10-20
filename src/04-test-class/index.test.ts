// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

const initialBalance = 1000;
const depositAmount = 500;
const bankAccount1 = getBankAccount(initialBalance);
const bankAccount2 = getBankAccount(initialBalance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(bankAccount1.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount1.withdraw(2000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount1.transfer(2000, bankAccount2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount1.transfer(2000, bankAccount1)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const prevBalance = bankAccount1.getBalance();
    bankAccount1.deposit(depositAmount);
    const balance = bankAccount1.getBalance();
    expect(balance).toEqual(prevBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const prevBalance = bankAccount1.getBalance();
    bankAccount1.withdraw(depositAmount);
    const balance = bankAccount1.getBalance();
    expect(balance).toEqual(prevBalance - depositAmount);
  });

  test('should transfer money', () => {
    const prevBalance = bankAccount2.getBalance();
    bankAccount1.transfer(depositAmount, bankAccount2);
    const balance = bankAccount2.getBalance();
    expect(balance).toEqual(prevBalance + depositAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    const fetchedBalance = await bankAccount1.fetchBalance();
    expect(typeof fetchedBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    await bankAccount1.synchronizeBalance();
    const balance = bankAccount1.getBalance();
    expect(balance).toEqual(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(0);
    await expect(() => bankAccount1.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
