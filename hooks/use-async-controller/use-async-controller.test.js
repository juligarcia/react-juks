import { renderHook, act } from '@testing-library/react-hooks'

import useAsyncController from './use-async-controller';
import { controlledRequest } from './utils';

test('initializes correctly with no callback', () => {
  const { result } = renderHook(() => useAsyncController());
  const [signal, abort] = result.current;

  expect(typeof signal).toBe('object');
  expect(signal.aborted).toBe(false);
  expect(typeof abort).toBe('function');
});

test('initializes correctly with callback', () => {
  const { result } = renderHook(() => useAsyncController(() => {}));
  const [signal, abort] = result.current;

  expect(typeof signal).toBe('object');
  expect(signal.aborted).toBe(false);
  expect(typeof abort).toBe('function');
});

test('signal is aborted', () => {
  const { result } = renderHook(() => useAsyncController());
  const [signal, abort] = result.current;

  act(() => {
    abort();
  });

  expect(signal.aborted).toBe(true);
});

test('new signal is created when current one is aborted', () => {
  const { result } = renderHook(() => useAsyncController());
  const [signal, abort] = result.current;

  act(() => {
    abort();
  });

  const [newSignal] = result.current;

  expect(signal !== newSignal).toBe(true);
});

test('request executes as intended', async () => {
  const { result } = renderHook(() => useAsyncController());
  const [signal] = result.current;

  const asyncTask = () =>
    new Promise(resolve => {
      setTimeout(() => resolve('resolved'), 1);
    });
  
  const asyncResult = await controlledRequest(signal, asyncTask);

  expect(asyncResult).toBe('resolved');
});

test('aborted controlled request sets error', () => {
  let error;

  const setError = () => {
    error = true;
  }

  const { result } = renderHook(() => useAsyncController(setError));
  const [signal, abort] = result.current;

  const asyncTask = () =>
    new Promise(resolve => {
      setTimeout(() => resolve('resolved'), 1);
    });

  controlledRequest(signal, asyncTask);

  act(() => {
    abort();
  });

  expect(error).toBe(true);
  expect(signal.aborted).toBe(true);
});

test('aborted controlled request throws exception', async () => {
  const { result } = renderHook(() => useAsyncController());
  const [signal, abort] = result.current;

  const asyncTask = () =>
    new Promise(resolve => {
      setTimeout(() => resolve('resolved'), 10);
    });

  let asyncResult = controlledRequest(signal, asyncTask).then(() => {}, error => expect(error instanceof DOMException).toBe(true));

  act(() => {
    abort();
  });

  return await asyncResult;
});

test('abort event listener is added when failure callback is available', async () => {
  const { result } = renderHook(() => useAsyncController());
  const [signal, abort] = result.current;

  signal.addEventListener = jest.fn().mockImplementationOnce((_, callback) => {
    callback();
  });

  controlledRequest(signal, () => {});

  expect(signal.addEventListener).toBeCalledWith('abort', expect.any(Function));
});

test('failure callback is called upon abort', async () => {
  const { result } = renderHook(() => useAsyncController());
  const [signal, abort] = result.current;

  const failureCallback = jest.fn();

  controlledRequest(signal, failureCallback);

  act(() => {
    abort();
  });

  expect(failureCallback).toBeCalled();
});
