import React from 'react';
import HeaderChat from '../../components/HeaderChat/HeaderChat';
import { ContentChat } from '../../components/ContentChat/ContentChat';
import { AllActionSendMessage } from '../../components/AllActionSendMessage/AllActionSendMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types';

const Chat = () => {
  const { currentChatUser } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {Object.keys(currentChatUser).length > 0 ? (
        <div className="h-full">
          <HeaderChat />
          <div className="h-[calc(100%-60px)] flex flex-col">
            <ContentChat />
            <AllActionSendMessage />
          </div>
        </div>
      ) : (
        <p className="text-background-hover-primary text-lg italic text-center translate-y-full h-[calc((100%-60px)/2)]">
          No user selected chat
        </p>
      )}
    </>
  );
};

export default Chat;
