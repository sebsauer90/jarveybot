import { defineComponent, watch } from '@vue/composition-api';
import { AuthorType } from '../../../jarveybot-core/src';
import '../../../jarveybot-react/src/ui/ChatContent.scss';

export default defineComponent({
  name: 'Content',
  props: {
    history: {
      type: Object,
      required: true,
    },
    isThinking: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    // const chatNode: Ref<HTMLDivElement | null> = ref<HTMLDivElement | null>(null);
    const isRunTime = typeof window !== 'undefined';

    watch(() => props.history, (history, prevHistory) => {
      if (isRunTime) {
        window.requestAnimationFrame(() => {
          /*
          TODO: FIX
          if (chatNode && chatNode.current) {
                      chatNode!!.current!!.scrollTop = chatNode!!.current!!.scrollHeight;
          }
           */
        });
      }
    });

    return () => (
      <div class='jb__content' ref={'chatNode'}>
        {props.history.value.map(({ id, message, author }) => (
          <div
            key={id}
            domPropsInnerHTML={message}
            class={`jb__message ${author === AuthorType.user ? 'jb__message--user' : ''}`}
          />
        ))}
        {props.isThinking && (
          <div>
            schreibt...
          </div>
        )}
      </div>
    );
  },
});
