import React from 'react';
import { Avatar } from 'antd';
import avatar from '../../../assets/images/avatar.png';

export const Header: React.FC = () => {
  return (
    <div className="h-[60px]">
      <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </div>
  );
};
