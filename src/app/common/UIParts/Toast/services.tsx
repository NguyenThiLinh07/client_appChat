import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { hiddenToast } from '../../../../store/toast/toastSlice';
import { RootState } from '../../../../types';

export const useService = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { type, isShow, label } = useSelector((state: RootState) => state.toast);

  const hide = () => {
    setTimeout(() => {
      dispatch(hiddenToast());
    }, 2000);
  };

  return {
    label,
    isShow,
    hide,
    type,
    t,
  };
};
