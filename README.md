# @jarveybot
A chat bot library, which you can use as react component, react hook, or vanilla javascript module.

## Documentation

### Usage as React component
TODO: Add documentation

```
import JarvyBot from '@jarveybot/react';
import '@jarveybot/react/dist/style.css';

<JarvyBot
  messages={messages}
  initialMessage="MESSAGE_ID"
  thinkingTime={1000}
  handleCloseChat={() => {
    console.log('close');
  }}
/>
```

### Usage as React hook
TODO: Add documentation

```
import useJarvyBot from '../hook/useJarvyBot';

...
const { currentMessage, history, handleResponse, isThinking, startConversation } = useJarvyBot({
  messages: MessageInterface[],
  initialMessage: string,
  thinkingTime?: number,
  handleDone?: Function,
});
...
startConversation();
```

### Usage as vanilla javascript module
TODO: Add documentation

```
import JarvyBot from '@jarveybot/core';

const jarvyBot = new JarvyBot();

jarvyBot.initialize({
  handleSetMessage: handleSetMessageType,
  handleSetHistory: handleSetHistoryType,
  messages?: MessageInterface[],
  handleDone?: Function,
  handleThinking?: (isThinking: boolean) => void,
  thinkingTime?: number,
  debug?: boolean,
});

 jarvyBot.startConversation('MESSAGE_ID');
```

## What's next?
* Build and style the landingpage
* Add documentation
* React connector add configuration and options
* Add overview message option
* Add a vueJS Connector
...
