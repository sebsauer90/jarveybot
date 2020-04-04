import React from 'react';
import CloseIcon from '../icons/Close';
import '@jarveybot/styles/dist/scss/Header.scss';

interface PropsInterface {
  handleCloseChat?: Function;
}

function ChatHeader(props: PropsInterface) {
  const { handleCloseChat } = props;

  return (
    <div className="jb__header">
      {/* TODO: add chat options with reset */}
      <h4 className="jb__header__headline">Chat</h4>
      {handleCloseChat && (
        <button
          className="jb__close"
          title="Schließen"
          onClick={() => {
            handleCloseChat();
          }}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

export default ChatHeader;
