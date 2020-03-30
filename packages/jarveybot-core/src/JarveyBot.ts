import {
  MessageInterface,
  handleSetMessageType,
  handleThinkingType,
  HistoryMessageInterface,
  handleSetHistoryType,
  AuthorType,
} from './interfaces';
import { validate } from './validator';

interface InitializeParamsInterface {
  handleSetMessage: handleSetMessageType;
  handleSetHistory: handleSetHistoryType;
  messages?: MessageInterface[];
  handleDone?: Function;
  handleThinking?: (isThinking: boolean) => void;
  thinkingTime?: number;
  debug?: boolean;
}

class JarvyBot {
  isThinking: boolean = false;

  thinkingTime: number = 500;

  currentMessage: MessageInterface | null = null;

  messages: { [key: string]: MessageInterface } = {};

  context: { [key: string]: any } = {};

  handleSetMessage: handleSetMessageType | null = null;

  handleSetHistory: handleSetHistoryType | null = null;

  handleDone: Function | null = null;

  handleThinking: handleThinkingType | null = null;

  chatHistory: HistoryMessageInterface[] = [];

  debug: boolean = false;

  initialize(params: InitializeParamsInterface) {
    const {
      messages,
      handleSetMessage,
      handleSetHistory,
      handleDone,
      handleThinking,
      thinkingTime,
      debug,
    } = params;

    if (debug) {
      this.debug = debug;
    }

    if (!handleSetMessage) {
      this.error('[JarvyBot.initialize] handleSetMessage function is missing');
      return;
    }

    if (!handleSetHistory) {
      this.error('[JarvyBot.initialize] handleSetHistory function is missing');
      return;
    }

    this.handleSetMessage = handleSetMessage;
    this.handleSetHistory = handleSetHistory;

    if (thinkingTime) this.thinkingTime = thinkingTime;
    if (handleThinking) this.handleThinking = handleThinking;
    if (handleDone) this.handleDone = handleDone;
    if (messages) messages.forEach((message: MessageInterface) => this.addMessage(message));
  }

  addMessage(newMessage: MessageInterface) {
    const { id, message, action, response } = newMessage;

    if (!id) {
      this.error('[JarvyBot.addMessage] you must provide an id');
      return;
    }

    if (typeof message !== 'string') {
      this.error('[JarvyBot.addMessage] you must provide an id');
      return;
    }

    if (!action || typeof action.type !== 'string') {
      this.error('[JarvyBot.addMessage] you must provide an action with a type');
      return;
    }

    if (typeof response !== 'function') {
      this.error('[JarvyBot.addMessage] you must provide a response handler');
      return;
    }

    if (this.messages[id]) {
      this.error(`[JarvyBot.addMessage] message with id ${id} already exists`);
      return;
    }

    this.messages = {
      ...this.messages,
      [id]: {
        ...newMessage,
      },
    };
  }

  formatMessage(message: string): string {
    const regex = /(\$[a-zA-Z]+)/gi;
    let transformedMessage = message;
    let match;

    while ((match = regex.exec(message)) !== null) {
      if (match.index === regex.lastIndex) regex.lastIndex++;

      const key = match[0];
      const name = key.replace('$', '');
      const value = this.getContextValue(name);

      if (value) {
        transformedMessage = transformedMessage.replace(key, String(value));
      }
    }

    return transformedMessage;
  }

  viewMessage(messageId: string, overwrites?: object) {
    if (!this.messages[messageId]) {
      this.error(`[JarvyBot.viewMessage] message with id ${messageId} dosent\`t exists`);
      return;
    }

    if (!this.handleSetMessage) {
      this.error('[JarvyBot.viewMessage] there is no handleSetMessage function defined');
      return;
    }

    this.log(`[JarvyBot.viewMessage] with id: ${messageId}`);
    const nextMessage = this.setCurrentMessage(messageId, overwrites);

    if (nextMessage) {
      const { id, message, action } = nextMessage;
      const formatted = this.formatMessage(message);

      this.handleSetMessage({
        id,
        action,
        message: formatted,
      });

      this.setHistoryMessage({
        id: String(new Date().getTime()),
        message: formatted,
        author: AuthorType.jarvey,
      });
    }
  }

  async startConversation(messageId: string) {
    await this.setIsThinking(true);
    this.viewMessage(messageId);
    this.setIsThinking(false);
  }

  async handleResponse(value: any, message: string) {
    this.setHistoryMessage({
      id: String(new Date().getTime()),
      message: String(message),
      author: AuthorType.user,
    });

    if (this.currentMessage && this.currentMessage.action.validator) {
      const errors = validate(
        this.currentMessage.action.validator,
        value,
        this.context,
      );

      if (errors) {
        await this.setIsThinking(true);
        this.setHistoryMessage({
          id: String(new Date().getTime()),
          message: errors[0],
          author: AuthorType.jarvey,
        });
        await this.setIsThinking(false);
        return;
      }
    }

    if (this.currentMessage) {
      await this.setIsThinking(true);

      const { action, response } = this.currentMessage;
      const { name } = action;
      this.log(`[JarvyBot.handleResponse] with value: ${String(value)}`);

      if (name) {
        this.setContextValue(name, value);
      }

      await response({
        value,
        contextData: this.context,
        nextMessage: this.viewMessage.bind(this),
        setContextValue: this.setContextValue.bind(this),
        handleDone: this.onDone.bind(this),
      });

      await this.setIsThinking(false);
    }
  }

  setHistoryMessage(message: HistoryMessageInterface) {
    this.chatHistory = [
      ...this.chatHistory,
      message,
    ];
    if (this.handleSetHistory) {
      this.handleSetHistory(this.chatHistory)
    };
  }

  setCurrentMessage(messageId: string, overwrites: object = {}): MessageInterface | null {
    if (!this.messages[messageId]) {
      this.error(`[JarvyBot.setCurrentMessage] message with id ${messageId} dosen\`t exists`);
      return null;
    }

    this.currentMessage = {
      ...this.messages[messageId],
      ...overwrites,
    };

    return this.currentMessage;
  }

  setContextValue(name: string, value: any) {
    this.context[name] = value;
    this.log('[JarvyBot] changed context to:');
    this.log(this.context);
  }

  async setIsThinking(isThinking: boolean) {
    return new Promise((resolve) => {
      const thinkingTime = isThinking ? this.thinkingTime : 0;
      this.isThinking = isThinking;

      if (this.handleThinking) this.handleThinking(this.isThinking);
      setTimeout(() => resolve(), thinkingTime);
    });
  }

  onDone() {
    if (this.handleDone) {
      this.handleDone();
    }
  }

  getContextValue(name: string): any {
    if (typeof this.context[name] === 'undefined') {
      this.warn(`[JarvyBot.getContextValue] ${name} is not defined in context`);
      return;
    }
    return this.context[name];
  }

  log = (...params: any) => {
    if (this.debug) console.log(...params);
  }

  warn = (...params: any) => {
    if (this.debug) console.warn(...params);
  }

  error = (...params: any) => {
    if (this.debug) console.error(...params);
  }
};

export default JarvyBot;
