import { ABORT_ERROR } from './constants';

export const controlledRequest = async (abortSignal, asyncTask, failureCallback) => {
  return new Promise(async (resolve, reject) => {
    if (abortSignal)
      abortSignal.addEventListener('abort', () => {
        if (failureCallback) failureCallback(ABORT_ERROR);
        reject(new DOMException(ABORT_ERROR, 'AbortError'));
      });
    resolve(await asyncTask());
  });
};