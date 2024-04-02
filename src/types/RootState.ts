import { AuthState } from '../store/auth/authSlice';
import { ToastState } from '../store/toast/toastSlice';

export interface RootState {
  auth: AuthState;
  toast: ToastState;
}
