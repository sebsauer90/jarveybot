# @jarveybot
A chat bot library, which you can use as react component, react hook, or vanilla javascript module.

## Documentation

### Usage as React component
TODO: Add documentation

```
import JarveyBot from '@jarveybot/react';
import '@jarveybot/react/dist/style.css';

<JarveyBot
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
import useJarveyBot from '../hook/useJarveyBot';

...
const { currentMessage, history, handleResponse, isThinking, startConversation } = useJarveyBot({
  messages: MessageInterface[],
  initialMessage: string,
  thinkingTime?: number,
  handleDone?: Function,
});
...
startConversation();
```

### Usage as Vue component

```
import JarveyBot from '@jarveybot/vue';
import '@jarveybot/vue/dist/style.css';

<JarveyBot
  messages={messages}
  initialMessage="MESSAGE_ID"
  thinkingTime={1000}
  handleCloseChat={() => {
    console.log('close');
  }}
/>
```

### Usage as Vue composition function

```
import {useJarveyBot} from '@jarveybot/vue';

...
const { currentMessage, history, handleResponse, isThinking, startConversation } = useJarveyBot({
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
import JarveyBot from '@jarveybot/core';

const jarveyBot = new JarveyBot();

jarveyBot.initialize({
  handleSetMessage: handleSetMessageType,
  handleSetHistory: handleSetHistoryType,
  messages?: MessageInterface[],
  handleDone?: Function,
  handleThinking?: (isThinking: boolean) => void,
  thinkingTime?: number,
  debug?: boolean,
});

 jarveyBot.startConversation('MESSAGE_ID');
```

## What's next?
* Build and style the landingpage
* Add documentation
* React connector add configuration and options
* Add overview message option
* Add a vueJS Connector
...
