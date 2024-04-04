import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserFromCookie, saveUserCookie } from '../../helpers/cookies';
import { TUser } from '../../types/user/user';
import { authApi } from '../../api/authApi';

export type AuthState = {
  loading: boolean;
  currentUser: TUser;
  authenticated: boolean;
};

export const initialState: AuthState = {
  loading: false,
  currentUser: {},
  authenticated: false,
};

export const login = createAsyncThunk('auth/login', async (params: TUser, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true));
  console.log('da');
  try {
    await authApi.login(params).then((response) => {
      console.log('response', response);
    });
  } catch (error) {}

  thunkAPI.dispatch(setLoading(false));
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.authenticated = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuth(state) {
      state.authenticated = true;
      // @ts-ignore
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
