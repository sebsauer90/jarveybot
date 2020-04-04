import React, { useEffect, useRef } from 'react';
import { AuthorType, HistoryMessageInterface } from '@jarveybot/core';
import '../../../jarveybot-styles/src/Content.scss';

interface PropsInterface {
  history: HistoryMessageInterface[];
  isThinking: boolean;
}

function ChatContent(props: PropsInterface) {
  const { history, isThinking } = props;
  const chatNode = useRef<HTMLDivElement>(null);
  const isRunTime = typeof window !== 'undefined';

  useEffect(() => {
    if (isRunTime) {
      window.requestAnimationFrame(() => {
        if (chatNode && chatNode.current) {
          chatNode!!.current!!.scrollTop = chatNode!!.current!!.scrollHeight;
        }
      });
    }
  }, [history]);

  return (
    <div className="jb__content" ref={chatNode}>
      {history.map(({ id, message, author }) => (
        <div
          key={id}
          dangerouslySetInnerHTML={{ __html: message }}
          className={`jb__message ${author === AuthorType.user ? 'jb__message--user' : ''}`}
        />
      ))}
      {isThinking && (
        <div>
          schreibt...
        </div>
      )}
    </div>
  );
}

export default ChatContent;
