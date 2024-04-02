import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserFromCookie, saveUserCookie } from '../../helpers/cookies';

export type AuthState = {
  loading: boolean;
  currentUser: any;
  authenticated: boolean;
};

export const initialState: AuthState = {
  loading: false,
  currentUser: {},
  authenticated: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuth(state) {
      state.authenticated = true;
      state.currentUser = getUserFromCookie();
    },
    setCurrentUser(state, action: PayloadAction<any>) {
      state.currentUser = action.payload;
      saveUserCookie(action.payload);
    },
  },
  extraReducers: (builder) => {},
});

const { actions, reducer: authReducer } = slice;
export const { setLoading, setAuth, setCurrentUser } = actions;
export default authReducer;
