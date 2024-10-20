// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';

const filePath = '123.txt';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    jest.advanceTimersByTime(timeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setInterval');

    const callback = jest.fn();
    const timeout = 1000;

    doStuffByInterval(callback, timeout);

    jest.advanceTimersByTime(timeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByInterval(callback, timeout);

    jest.advanceTimersByTime(timeout * 2);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(filePath);
    expect(joinSpy).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(filePath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileData = '123';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileData);
    const result = await readFileAsynchronously(filePath);
    expect(result).toBe(fileData);
  });
});
