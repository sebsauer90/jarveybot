import { MessageInterface } from '../../../jarveybot-core/src/interfaces';

export default interface UseJarveyBotPayload {
  messages: MessageInterface[],
  initialMessage: string;
  thinkingTime: number,
  handleDone: () => void;
}
