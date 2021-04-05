import { createReducer } from '@reduxjs/toolkit';

import { SET_LOADING, CLEAR_LOADING } from '../constants';

const loadingReducer = createReducer({}, builder => {
  builder
    .addCase(SET_LOADING, (state, action) => {
      state[`${action.payload}Loading`] = true;
    })
    .addCase(CLEAR_LOADING, (state, action) => {
      state[`${action.payload}Loading`] = false;
    })
})

export default loadingReducer;
