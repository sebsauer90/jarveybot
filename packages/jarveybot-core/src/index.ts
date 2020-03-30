import JarvyBot from './JarveyBot';
import { required, minLength, email } from './validator';
import {
  AuthorType,
  OptionType,
  ResponseHandlerType,
  handleSetMessageType,
  handleSetHistoryType,
  handleThinkingType,
  validatorType,
  ActionInterface,
  MessageInterface,
  MessageDisplayInterface,
  HistoryMessageInterface,
} from './interfaces';

export {
  AuthorType,
  OptionType,
  ResponseHandlerType,
  handleSetMessageType,
  handleSetHistoryType,
  handleThinkingType,
  validatorType,
  ActionInterface,
  MessageInterface,
  MessageDisplayInterface,
  HistoryMessageInterface,
};

export const validator = {
  required,
  minLength,
  email,
};

export default JarvyBot;
