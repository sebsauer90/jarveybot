// types

export enum AuthorType {
  jarvey = 'jarvey',
  user = 'user',
};

export type OptionType = {
  value: any;
  label: string;
};

export type ResponseHandlerType = (params: {
  value: any;
  nextMessage: (messageId: string, overwrites?: object) => void;
  contextData: { [key: string]: any };
  setContextValue: (name: string, value: any) => void;
  handleDone: Function;
}) => void;

export type handleSetMessageType = (message: MessageDisplayInterface) => void;

export type handleSetHistoryType = (history: HistoryMessageInterface[]) => void;

export type handleThinkingType = (isThinking: boolean) => void;

export type validatorType = (value: any, data?: { [key: string]: string }) => null | string;

// interfaces

export interface ActionInterface {
  type: string;
  name?: string;
  options?: OptionType[];
  validator?: validatorType[];
}

export interface MessageInterface {
  id: string;
  message: string;
  action: ActionInterface;
  response: ResponseHandlerType;
}

export interface MessageDisplayInterface {
  id: string;
  message: string;
  action: ActionInterface;
}

export interface HistoryMessageInterface {
  id: string;
  message: string;
  author: AuthorType;
}
