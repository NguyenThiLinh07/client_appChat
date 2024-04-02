import React, { useEffect } from 'react';
import { toast, ToastContainer, ToastOptions, Zoom } from 'react-toastify';
import { ETypeToast } from '../../../enum';
import { useService } from './services';
import 'react-toastify/dist/ReactToastify.css';
const Toast: React.FC = () => {
  const { label, isShow, hide, type } = useService();

  const options: ToastOptions = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'colored',
    transition: Zoom,
    onClose: () => {
      hide();
    },
  };

  useEffect(() => {
    if (isShow) {
      if (type === ETypeToast.Success) toast.success(label, options);
      else toast.error(label, options);
    }
  }, [isShow]);

  return <ToastContainer position="top-center" autoClose={2000} theme="colored" />;
};

export default Toast;
