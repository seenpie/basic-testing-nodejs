// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => ({
  get: jest.fn().mockRejectedValue({ data: { id: 123, title: '123' } }),
  create() {
    return {
      get: this.get.mockResolvedValue({ data: { id: 123, title: '123' } }),
    };
  },
}));
jest.mock('lodash', () => {
  return {
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/');
    expect(axiosSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/');
    expect(axios.create().get).toHaveBeenCalledWith('/');
  });

  test('should return response data', async () => {
    const mockedData = { data: { id: 123, title: '123' } };
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockedData });

    const data = await throttledGetDataFromApi('/');
    expect(data).toBe(mockedData);
  });
});
