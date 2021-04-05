import { setLoading, clearLoading } from './redux/actions';
import { ABORT_ERROR } from './constants';

export const controlledRequest = async (abortSignal, asyncTask, failureCallback) => {
  if (abortSignal)
    return new Promise(async (resolve, reject) => {
      abortSignal.addEventListener('abort', () => {
        if (failureCallback) failureCallback(ABORT_ERROR);
        reject(new DOMException(ABORT_ERROR, 'AbortError'));
      });
      resolve(await asyncTask());
    });
  return await asyncTask();
};

export const customCallback = (setter, progressSetter, callback, reduxConfig) => result => {
  const { dispatch, reduxTarget } = reduxConfig;

  setter(result);
  progressSetter(false);

  if (reduxTarget) dispatch(clearLoading(reduxTarget));

  if (callback) callback(result);
}

export const initiateRequest = (setInProgress, reduxConfig) => {
  const { reduxAction, dispatch, reduxTarget } = reduxConfig;

  if (reduxAction) dispatch(reduxAction);
  if (reduxTarget) dispatch(setLoading(reduxTarget));

  setInProgress(true);
}
