import React from 'react';
import JarvyBot from '@jarveybot/react';
import messages from './messages';
import '@jarveybot/react/dist/style.css';

function Chat() {
  return (
    <div>
      <JarvyBot
        test={React}
        messages={messages}
        initialMessage="start"
        thinkingTime={1000}
        handleCloseChat={() => {
          console.log('close');
        }}
      />
    </div>
  );
}

export default Chat
