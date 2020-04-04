import { defineComponent, onMounted, watch } from '@vue/composition-api';
import IconSend from './icons/IconSend';
import '@jarveybot/styles/dist/scss/Footer.scss';

export default defineComponent({
  name: 'Footer',
  components: {
    IconSend,
  },
  props: {
    currentMessage: {
      type: Object,
      required: true,
    },
    history: {
      type: Object,
      required: true,
    },
    isThinking: {
      type: Boolean,
      required: true,
    },
    handleResponse: {
      type: Function,
      required: true,
    },
    setText: {
      type: Function,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    inputNode: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isRunTime = typeof window !== 'undefined';

    const listener = (e: any) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        if (props.text) {
          props.handleResponse(props.text, props.text);
          return false;
        }
      }
      return true;
    };

    const watcher = () => {
      props.setText('');
      if (isRunTime && props.currentMessage) {
        window.requestAnimationFrame(() => {
          if (props.inputNode && props.inputNode.current) {
            props.inputNode.current.focus();
          }
        });
      }
    };

    onMounted(() => {
      if (isRunTime) {
        window.addEventListener('keyup', listener);
        return () => {
          window.removeEventListener('keyup', listener);
        };
      }
      return () => {
      };
    });

    watch(() => props.history, (history, prevHistory) => watcher);
    watch(() => props.currentMessage, (history, prevHistory) => watcher);

    return () => (
      <div class="jb__footer">
        <div class="jb__userInput">
          {props.currentMessage && !props.isThinking && (
            <div>
              {props.currentMessage.action.type === 'select' && (
                <div>
                  {props.currentMessage!!.action!!.options!!.map(({ label, value }, index) => (
                    <button
                      ref={index === 0 ? props.inputNode : null}
                      key={value}
                      class="jb__option"
                      onclick={() => props.handleResponse(value, label)}>
                      {label}
                    </button>
                  ))}
                </div>
              )}

              {props.currentMessage.action.type === 'text' && (
                <textarea
                  ref={props.inputNode}
                  tabindex={1}
                  class="jb__textInput"
                  value={props.text}
                  placeholder="Ihre Nachricht"
                  onchange={e => props.setText(e.currentTarget.value)}
                  onkeydown={listener}
                />
              )}
            </div>
          )}
        </div>

        <button
          class="jb__send"
          title="Absenden"
          onclick={() => {
            if (props.text) {
              props.handleResponse(props.text, props.text);
            }
          }}>
          <IconSend/>
        </button>
      </div>
    );
  },
});
