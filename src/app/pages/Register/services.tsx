import { useTranslation } from 'react-i18next';
import { registerUser } from '../../../store/auth/authSlice';
import { AppDispatch } from '../../../store/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../types';

const useService = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleRegister = async (values: any) => {
    console.log('values', values);
    const { confirmPassword, ...data } = values;
    await dispatch(registerUser(data));
  };

  return {
    t,
    loading,
    handleRegister,
  };
};

export default useService;
