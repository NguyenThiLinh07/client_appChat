import React from 'react';
import Avatar from '../../common/Avatar/Avatar';
import { IoCall } from 'react-icons/io5';
import { FaVideo } from 'react-icons/fa';
import { IoIosHelpCircle } from 'react-icons/io';

type Props = {};

const HeaderChat: React.FC<Props> = (props: Props) => {
  return (
    <div className="bg-secondary shadow-default px-4 py-2 flex flex-row justify-between h-[60px]">
      <div className="flex flex-row gap-2">
        <Avatar type="sm" image={'/avatar.jpg'} />
        <p className="my-auto text-base font-semibold text-white">Linh Nguyen</p>
      </div>
      <div className="flex flex-row gap-8">
        <IoCall size={24} className="my-auto text-secondary1" />
        <FaVideo size={24} className="my-auto text-secondary1" />
        <IoIosHelpCircle size={24} className="my-auto text-secondary1" />
      </div>
    </div>
  );
};

export default HeaderChat;
