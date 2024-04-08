import type { Action, ThunkAction } from '@reduxjs/toolkit';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  Middleware,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { IndexedObject } from '../types/common';
import { createReducer, rootReducers } from './reducers';

const reducer = createReducer(rootReducers);

const initializeStore = (preloadedState = undefined) => {
  const middleware = [...getDefaultMiddleware()];

  return configureStore({
    reducer,
    middleware,
    preloadedState,
  });
};
export const store = initializeStore();
export type RootState = ReturnType<typeof reducer>;
export type AsyncAction<R = void> = ThunkAction<Promise<R>, RootState, undefined, Action<string>>;
export type Dispatch = ThunkDispatch<RootState, IndexedObject, Action>;
