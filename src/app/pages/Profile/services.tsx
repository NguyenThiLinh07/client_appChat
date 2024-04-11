import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types';

const useServices = () => {
  const { t } = useTranslation();
  const { currentUser, loading } = useSelector((state: RootState) => state.auth);

  const [image, setImage] = useState<string>(currentUser?.avatar ?? '/avatar.jpg');

  const handleUpdateProfile = (values: any) => {
    console.log('values', values);
  };
  return { t, currentUser, loading, image, setImage, handleUpdateProfile };
};

export default useServices;
