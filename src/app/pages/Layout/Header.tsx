import React from 'react';
import Avatar from '../../common/Avatar/Avatar';
import { Button } from 'antd';
import { logout } from '../../../store/auth/authSlice';
import { AppDispatch } from '../../../store/configureStore';
import { useDispatch } from 'react-redux';

export const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-[60px] shadow-default flex flex-row justify-between px-4 bg-secondary border-b border-[#f6f8fa3d]">
      <div className="flex flex-row gap-2">
        <Avatar type="md" image={'/avatar.jpg'} isPreview={true} />
        <p className="my-auto text-base font-semibold text-white">Linh Nguyen</p>
      </div>
      <Button onClick={handleLogout} className="my-auto">
        Logout
      </Button>
    </div>
  );
};
