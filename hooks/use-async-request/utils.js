import { setLoading, clearLoading } from './redux/actions';

export const customCallback = (setter, progressSetter, triggerSignalSetter, callback, reduxConfig) => result => {
  const { dispatch, reduxTarget } = reduxConfig;

  setter(result);
  progressSetter(false);
  triggerSignalSetter(false);

  if (reduxTarget) dispatch(clearLoading(reduxTarget));

  if (callback) callback(result);
}

export const initiateRequest = (setInProgress, reduxConfig) => {
  const { reduxAction, dispatch, reduxTarget } = reduxConfig;

  if (reduxAction) dispatch(reduxAction);
  if (reduxTarget) dispatch(setLoading(reduxTarget));

  setInProgress(true);
}
