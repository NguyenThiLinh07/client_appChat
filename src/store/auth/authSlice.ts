import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserFromCookie,
  removeRefreshToken,
  removeToken,
  removeUser,
  saveRefreshTokenCookie,
  saveTokenCookie,
  saveUserCookie,
} from '../../helpers/cookies';
import { TUser } from '../../types/user/user';
import { authApi } from '../../api/authApi';
import { EPath } from '../../app/routes/routesConfig';
import { setShowToast } from '../toast/toastSlice';
import { ETypeToast } from '../../app/enum';

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

export const registerUser = createAsyncThunk('auth/register', async (params: TUser, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true));
  try {
    await authApi.register(params).then((response: any) => {
      thunkAPI.dispatch(
        setCurrentUser({
          user: response.data.user,
          expires: new Date(response.data.tokens.access.expires.toString()),
        }),
      );
      thunkAPI.dispatch(setAuth());
      saveTokenCookie(
        response.data.tokens.access.token,
        new Date(response.data.tokens.access.expires.toString()),
      );
      saveRefreshTokenCookie(
        response.data.tokens.refresh.token,
        new Date(response.data.tokens.refresh.expires.toString()),
      );
      window.location.href = EPath.home;
      thunkAPI.dispatch(setShowToast({ label: 'Register successfully', type: ETypeToast.Success }));
    });
  } catch (error: any) {
    thunkAPI.dispatch(setShowToast({ label: error.response.data.message, type: ETypeToast.Error }));
  }
  thunkAPI.dispatch(setLoading(false));
});

export const login = createAsyncThunk('auth/login', async (params: TUser, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true));
  try {
    await authApi.login(params).then((response: any) => {
      thunkAPI.dispatch(
        setCurrentUser({
          user: response.data.user,
          expires: new Date(response.data.tokens.access.expires.toString()),
        }),
      );
      thunkAPI.dispatch(setAuth());
      saveTokenCookie(
        response.data.tokens.access.token,
        new Date(response.data.tokens.access.expires.toString()),
      );
      saveRefreshTokenCookie(
        response.data.tokens.refresh.token,
        new Date(response.data.tokens.refresh.expires.toString()),
      );
      window.location.href = EPath.home;
    });
  } catch (error: any) {
    thunkAPI.dispatch(setShowToast({ label: error.response.data.message, type: ETypeToast.Error }));
  }
  thunkAPI.dispatch(setLoading(false));
});

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (params: { token: string; expires: Date }, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      await authApi.loginWithGoogle(params.token).then((response: any) => {
        thunkAPI.dispatch(setCurrentUser({ user: response.data.user, expires: params.expires }));
        thunkAPI.dispatch(setAuth());
        window.location.href = EPath.home;
      });
    } catch (error: any) {
      thunkAPI.dispatch(
        setShowToast({ label: error.response.data.message, type: ETypeToast.Error }),
      );
    }
    thunkAPI.dispatch(setLoading(false));
  },
);

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.authenticated = false;
      state.currentUser = {};
      removeUser();
      removeToken();
      removeRefreshToken();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuth(state) {
      state.authenticated = true;
      state.currentUser = getUserFromCookie();
    },
    setCurrentUser(state, action: PayloadAction<any>) {
      state.currentUser = action.payload.user;
      saveUserCookie(action.payload.user, action.payload.expires);
    },
  },
  extraReducers: (builder) => {},
});

const { actions, reducer: authReducer } = slice;
export const { setLoading, setAuth, setCurrentUser, logout } = actions;
export default authReducer;
