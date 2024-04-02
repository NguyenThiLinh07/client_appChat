import { useTranslation } from 'react-i18next';

const useService = () => {
  const { t } = useTranslation();

  return {
    t,
  };
};

export default useService;
