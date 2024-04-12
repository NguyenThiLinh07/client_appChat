import React from 'react';
import HeaderChat from '../../components/HeaderChat/HeaderChat';
import { ContentChat } from '../../components/ContentChat/ContentChat';
import { AllActionSendMessage } from '../../components/AllActionSendMessage/AllActionSendMessage';

const Chat = () => {
  return (
    <div className="h-full">
      <HeaderChat />
      <div className="h-[calc(100%-60px)] flex flex-col">
        <ContentChat />
        <AllActionSendMessage />
      </div>
    </div>
  );
};

export default Chat;
