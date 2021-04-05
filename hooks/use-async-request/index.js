import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { controlledRequest, customCallback, initiateRequest } from './utils';

const useAsyncRequest = (asyncTask, dependencies = [], config = {}) => {
  const [inProgress, setInProgress] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const { successCallback, failureCallback, abortSignal, reduxAction, reduxTarget } = config;

  const reduxConfig = { reduxAction, reduxTarget, dispatch }

  const customSuccessCallback = customCallback(setData, setInProgress, successCallback, reduxConfig);
  const customFailureCallback = customCallback(setError, setInProgress, failureCallback, reduxConfig);

  useEffect(() => {
    initiateRequest(setInProgress, reduxConfig);
    const result = controlledRequest(abortSignal, asyncTask, customFailureCallback);
    customSuccessCallback(result);
  }, dependencies);

  return { inProgress, data, error };
};

export default useAsyncRequest;
