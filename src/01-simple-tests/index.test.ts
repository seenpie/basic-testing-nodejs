// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const addResult = simpleCalculator({ a: 1, b: 1, action: Action.Add });
    expect(addResult).toEqual(2);
  });

  test('should subtract two numbers', () => {
    const subtractResult = simpleCalculator({
      a: 1,
      b: 1,
      action: Action.Subtract,
    });
    expect(subtractResult).toEqual(0);
  });

  test('should multiply two numbers', () => {
    const multiplyResult = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Multiply,
    });
    expect(multiplyResult).toEqual(4);
  });

  test('should divide two numbers', () => {
    const divideResult = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Divide,
    });
    expect(divideResult).toEqual(1);
  });

  test('should exponentiate two numbers', () => {
    const exponentiateResult = simpleCalculator({
      a: 2,
      b: 5,
      action: Action.Exponentiate,
    });
    expect(exponentiateResult).toEqual(32);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 2,
      b: 5,
      action: 123,
    });
    expect(result).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: null,
      b: 5,
      action: 123,
    });
    expect(result).toEqual(null);
  });
});
