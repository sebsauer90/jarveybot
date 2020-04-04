import { HistoryMessageInterface, MessageDisplayInterface } from '../../../jarveybot-core/src/interfaces';
import JarvyBot from '../../../jarveybot-core/src/JarveyBot';
import { onMounted, ref } from '@vue/composition-api';
import UseJarveyBotPayload from '../interfaces/UseJarveyBotPayload';

const jarvyBot = new JarvyBot();

const useJarveyBot = (payload: UseJarveyBotPayload) => {
  const isThinking = ref<boolean>(false);
  const currentMessage = ref<MessageDisplayInterface | null>(null);
  const history = ref<HistoryMessageInterface[] | null>([]);

  const handleSetMessage = (message: MessageDisplayInterface) => {
    currentMessage.value = message;
  };

  function handleResponse(value: any, message: string) {
    jarvyBot.handleResponse(value, message);
  }

  function startConversation() {
    jarvyBot.startConversation(payload.initialMessage);
  }

  onMounted(() => {
    jarvyBot.initialize({
      handleSetMessage,
      messages: payload.messages,
      thinkingTime: payload.thinkingTime,
      handleSetHistory: (newHistory: HistoryMessageInterface[]) => {
        history.value = newHistory;
      },
      handleThinking: (thinking: boolean) => {
        isThinking.value = thinking;
      },
      handleDone: payload.handleDone,
      debug: true,
    });
  });

  return {
    currentMessage,
    history,
    handleResponse,
    isThinking,
    startConversation,
  };
};

export { useJarveyBot };
