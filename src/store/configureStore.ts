import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducers } from './reducers';

const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
