import useAsyncRequest from './hooks/use-async-request';
import loadingReducer from './hooks/use-async-request/redux/reducer';
import useAsyncController from './hooks/use-async-controller';

const juks = {
  useAsyncRequest,
  loadingReducer,
  useAsyncController
};

export default juks;
