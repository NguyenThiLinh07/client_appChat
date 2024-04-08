import { useTranslation } from 'react-i18next';

const useServices = () => {
  const { t } = useTranslation();
  return { t };
};

export default useServices;
