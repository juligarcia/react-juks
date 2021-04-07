import { useEffect, useState, useCallback } from 'react';

const useRequestController = (failureCallback) => {
  const [controller, setController] = useState(new AbortController());
  const [refreshController, setRefreshController] = useState(false);

  useEffect(() => {
    if (refreshController) {
      setController(new AbortController());
      setRefreshController(false);
    };
  }, [refreshController]);

  const abort = useCallback(() => {
    controller.abort();
    setRefreshController(true);
    if (failureCallback) failureCallback();
  }, [failureCallback]);

  return [controller.signal, abort];
}

export default useRequestController;
