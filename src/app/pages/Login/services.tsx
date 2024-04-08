import { useTranslation } from 'react-i18next';
import { login, loginWithGoogle } from '../../../store/auth/authSlice';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { firebaseAuth } from '../../../services/firebase';
import { saveRefreshTokenCookie, saveTokenCookie } from '../../../helpers/cookies';
import { AppDispatch } from '../../../store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../types';

const useService = () => {
  const { loading } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const handleLogin = (values: any) => {
    const { remember, ...data } = values;
    dispatch(login(data));
  };

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const timestamp = (user as any)?.stsTokenManager?.expirationTime;
    saveTokenCookie((user as any)?.stsTokenManager?.accessToken, new Date(timestamp));
    saveRefreshTokenCookie((user as any)?.stsTokenManager?.refreshToken, new Date(timestamp));
    await dispatch(
      loginWithGoogle({
        token: (user as any)?.stsTokenManager?.accessToken,
        expires: new Date(timestamp),
      }),
    );
  };

  return {
    t,
    loading,
    handleLogin,
    handleLoginWithGoogle,
  };
};

export default useService;
