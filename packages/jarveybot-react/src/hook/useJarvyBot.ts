import { useState, useEffect } from 'react';
import JarvyBot, { MessageInterface, MessageDisplayInterface, HistoryMessageInterface } from '@jarveybot/core';

const jarvyBot = new JarvyBot();

interface HookPropsInterface {
  messages: MessageInterface[];
  initialMessage: string;
  thinkingTime?: number;
  handleDone?: Function;
}

function useJarvyBot(props: HookPropsInterface) {
  const { messages, initialMessage, thinkingTime, handleDone } = props;
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<MessageDisplayInterface | null>(null);
  const [history, setHistory] = useState<HistoryMessageInterface[]>([]);

  const handleSetMessage = (message: MessageDisplayInterface) => {
    setCurrentMessage(message);
  };

  const handleResponse = (value: any, message: string) => {
    jarvyBot.handleResponse(value, message);
  };

  const startConversation = () => {
    jarvyBot.startConversation(initialMessage);
  };

  useEffect(() => {
    jarvyBot.initialize({
      handleSetMessage,
      messages,
      thinkingTime,
      handleSetHistory: setHistory,
      handleThinking: setIsThinking,
      handleDone,
      debug: true,
    });
  }, []);

  return {
    history,
    currentMessage,
    handleResponse,
    isThinking,
    startConversation,
  };
}

export default useJarvyBot;
