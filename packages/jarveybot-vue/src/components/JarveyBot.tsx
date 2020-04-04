import { defineComponent, onMounted, ref } from '@vue/composition-api';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useJarveyBot } from '../composition/useJarveyBot';
import '@jarveybot/styles/dist/scss/Chat.scss';

export default defineComponent({
  name: 'JarveyBot',
  components: {
    Header,
    Content,
    Footer,
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  setup(props) {

    const { currentMessage, history, handleResponse, isThinking, startConversation } = useJarveyBot({
      messages: props.config.messages,
      initialMessage: props.config.initialMessage,
      handleDone: props.config.handleCloseChat,
      thinkingTime: props.config.thinkingTime,
    });

    const text = ref<string>('');
    const inputNode = ref<any>(null);

    onMounted(()=> {
      startConversation();
    });

    return () => (
      <div class="jb__container">
        <Header handleCloseChat={props.config.handleCloseChat}/>
        <Content
          history={history}
          isThinking={isThinking.value}/>
        <Footer
          currentMessage={currentMessage.value}
          isThinking={isThinking.value}
          inputNode={inputNode}
          handleResponse={handleResponse}
          text={text.value}
          setText={(value: string) => {
            text.value = value;
          }}
          history={history}/>
      </div>
    );
  },
});
