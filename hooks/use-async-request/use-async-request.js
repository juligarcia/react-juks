import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useAsyncController from '../use-async-controller/use-async-controller';

import { controlledRequest, customCallback, initiateRequest } from './utils';

const useAsyncRequest = (asyncTask, dependencies = [], config = {}) => {
  const [inProgress, setInProgress] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const [triggerSignal, setTriggerSignal] = useState(false);
  const triggerRequest = () => setTriggerSignal(true);

  const dispatch = useDispatch();

  const { successCallback, failureCallback, reduxAction, reduxTarget } = config;

  const reduxConfig = { reduxAction, reduxTarget, dispatch }

  const customSuccessCallback = customCallback(setData, setInProgress, setTriggerSignal, successCallback, reduxConfig);
  const customFailureCallback = customCallback(setError, setInProgress, setTriggerSignal, failureCallback, reduxConfig);

  const [abortSignal, abort] = useAsyncController(customFailureCallback);

  useEffect(() => {
    initiateRequest(setInProgress, reduxConfig);
    controlledRequest(abortSignal, asyncTask, customFailureCallback).then(customSuccessCallback, customFailureCallback);
  }, dependencies || [triggerSignal]);

  return { inProgress, data, error, abort, triggerRequest };
};

export default useAsyncRequest;
