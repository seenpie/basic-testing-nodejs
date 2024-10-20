// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const elements = ['a', 'b', 'c'];

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const expectedLinkedList = {
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    const linkedList = generateLinkedList(elements);
    expect(linkedList).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(elements);
    expect(linkedList).toMatchSnapshot();
  });
});
