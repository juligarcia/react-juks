import { createAction } from '@reduxjs/toolkit'

import { SET_LOADING, CLEAR_LOADING } from '../constants';

export const setLoading = createAction(SET_LOADING);

export const clearLoading = createAction(CLEAR_LOADING);
