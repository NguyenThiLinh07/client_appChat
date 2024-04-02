import { InjectedReducersType } from '../utils/types/injector-typings';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import toastReducer from './toast/toastSlice';

export const rootReducers = {
  auth: authReducer,
  toast: toastReducer,
};

export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return (state: any) => state;
  } else {
    return combineReducers({
      ...injectedReducers,
    });
  }
}
