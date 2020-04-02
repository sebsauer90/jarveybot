import React, { useState } from 'react';
import JarvyBot from '@jarveybot/react';
import '@jarveybot/react/dist/style.css';
import ChatIcon from '../Icons/Chat';
import messages from './messages';
import styles from './Chat.module.scss';

function Chat() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.conatiner}>
      {isOpen && (
        <div className={styles.chat}>
          <JarvyBot
            messages={messages}
            initialMessage="start"
            thinkingTime={1000}
            handleCloseChat={() => setIsOpen(false)}
          />
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)}>
        <ChatIcon />
      </button>
    </div>
  );
}

export default Chat
