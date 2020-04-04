import { defineComponent, ref, watch } from '@vue/composition-api';
import { AuthorType } from '@jarveybot/core';
import '../../../jarveybot-styles/src/Content.scss';

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
    const chatNode: any = ref<any>(null);
    const isRunTime = typeof window !== 'undefined';

    watch(() => props.history, (history, prevHistory) => {
      if (isRunTime) {
        window.requestAnimationFrame(() => {
          if (chatNode && chatNode.current) {
                      chatNode!!.current!!.scrollTop = chatNode!!.current!!.scrollHeight;
          }
        });
      }
    });

    return () => (
      <div class='jb__content' ref={chatNode}>
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
