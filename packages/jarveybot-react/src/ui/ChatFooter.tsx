import React, { useEffect } from 'react';
import { MessageDisplayInterface, HistoryMessageInterface } from '@jarveybot/core';
import SendIcon from '../icons/Send';
import '../../../jarveybot-styles/src/Footer.scss';

interface PropsInterface {
  currentMessage: MessageDisplayInterface | null;
  isThinking: boolean;
  inputNode: any;
  handleResponse: (value: string, lable: string) => void;
  text: string;
  setText: Function;
  history: HistoryMessageInterface[];
}

function ChatFooter(props: PropsInterface) {
  const { currentMessage, isThinking, inputNode, handleResponse, text, setText, history } = props;
  const isRunTime = typeof window !== 'undefined';

  const listener = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (text) {
        handleResponse(text, text)
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setText('');
    if (isRunTime && currentMessage) {
      window.requestAnimationFrame(() => {
        if (inputNode && inputNode.current) {
          inputNode.current.focus();
        }
      });
    }
  }, [currentMessage, history]);

  useEffect(() => {
    if (isRunTime) {
      window.addEventListener('keyup', listener);
      return () => {
        window.removeEventListener('keyup', listener);
      };
    }
    return () => {};
  }, []);

  return (
    <div className="jb__footer">
      <div className="jb__userInput">
        {currentMessage && !isThinking && (
          <>
            {currentMessage.action.type === 'select' && (
              <div>
                {currentMessage!!.action!!.options!!.map(({ label, value }, index) => (
                  <button
                    ref={index === 0 ? inputNode : null}
                    key={value}
                    className="jb__option"
                    onClick={() => handleResponse(value, label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {currentMessage.action.type === 'text' && (
              <textarea
                ref={inputNode}
                tabIndex={1}
                className="jb__textInput"
                value={text}
                placeholder="Ihre Nachricht"
                onChange={e => setText(e.currentTarget.value)}
                onKeyDown={listener}
              />
            )}
          </>
        )}
      </div>

      <button
        className="jb__send"
        title="Absenden"
        onClick={() => {
          if (text) {
            handleResponse(text, text)
          }
        }}
      >
        <SendIcon />
      </button>
    </div>
  );
}

export default ChatFooter;
