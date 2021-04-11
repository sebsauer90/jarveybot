import { MessageInterface } from '@jarveybot/core';

export default interface UseJarveyBotPayload {
  messages: MessageInterface[],
  initialMessage: string;
  thinkingTime: number,
  handleDone: () => void;
}
