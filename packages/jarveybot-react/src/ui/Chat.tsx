import React, { useState, useEffect, useRef } from 'react';
import { MessageInterface } from '@jarveybot/core';
import useJarvyBot from '../hook/useJarvyBot';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import ChatFooter from './ChatFooter';
import '../../../jarveybot-styles/src/Chat.scss';

interface PropsInterface {
  messages: MessageInterface[],
  initialMessage: string;
  thinkingTime?: number;
  test: any;
  handleCloseChat?: () => void;
}

function Chat(props: PropsInterface) {
  const {
    messages,
    initialMessage,
    thinkingTime,
    handleCloseChat,
  } = props;

  const [text, setText] = useState('');
  const inputNode = useRef(null);

  const { currentMessage, history, handleResponse, isThinking, startConversation } = useJarvyBot({
    messages,
    initialMessage,
    thinkingTime: thinkingTime || 1000,
    handleDone: handleCloseChat,
  });

  useEffect(() => {
    startConversation();
  }, []);

  return (
    <div className="jb__container">
      <ChatHeader
        handleCloseChat={handleCloseChat}
      />

      <ChatContent
        history={history}
        isThinking={isThinking}
      />

      <ChatFooter
        currentMessage={currentMessage}
        isThinking={isThinking}
        inputNode={inputNode}
        handleResponse={handleResponse}
        text={text}
        setText={setText}
        history={history}
      />
    </div>
  );
}

export default Chat;
