import { ETypeToast } from '../../app/enum';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastState = {
  label: string;
  isShow: boolean;
  type: ETypeToast;
};

const initialState: ToastState = {
  label: '',
  isShow: false,
  type: ETypeToast.Success,
};

export const setShowToast = createAsyncThunk(
  'toast/setShowToast',
  async (params: { label: string; type: ETypeToast }, thunkAPI) => {
    thunkAPI.dispatch(
      showToast({
        isShow: true,
        label: params.label,
        type: params.type,
      }),
    );
  },
);

const slice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastState>) => {
      state.isShow = true;
      state.type = action.payload.type;
      state.label = action.payload.label;
    },
    hiddenToast: (state) => {
      state.isShow = false;
      state.type = ETypeToast.Success;
    },
  },
  extraReducers: () => {},
});

export const { actions, reducer: toastReducer } = slice;
export const { hiddenToast, showToast } = actions;
export default toastReducer;
