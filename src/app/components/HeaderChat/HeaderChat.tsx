import React from 'react';
import Avatar from '../../common/Avatar/Avatar';
import { IoCall } from 'react-icons/io5';
import { FaVideo } from 'react-icons/fa';
import { IoIosHelpCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types';

type Props = {};

const HeaderChat: React.FC<Props> = (props: Props) => {
  const { currentChatUser } = useSelector((state: RootState) => state.auth);

  return (
    <div className="bg-secondary shadow-default px-4 py-2 flex flex-row justify-between h-[60px]">
      <div className="flex flex-row gap-2">
        <Avatar type="sm" image={currentChatUser?.avatar ?? ''} />
        <div className="flex flex-col justify-between">
          <p className="my-auto text-base font-semibold text-white truncate w-[calc(100vw-600px)]">
            {currentChatUser?.name}
          </p>
          <div className="flex flex-row gap-2">
            <p
              className={`w-2 h-2 rounded-full my-auto ${currentChatUser?.online ? 'bg-online' : 'bg-background-hover-primary'}`}
            ></p>
            <p className="text-background-hover-primary text-xs">
              {currentChatUser?.online ? 'online' : 'offline'}
            </p>
          </div>
        </div>
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
