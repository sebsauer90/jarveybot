import { defineComponent } from '@vue/composition-api';
import '../../../jarveybot-styles/src/Header.scss';
import IconClose from './icons/IconClose';

export default defineComponent({
  name: 'Header',
  components: {
    IconClose,
  },
  props: {
    handleCloseChat: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="jb__header">
        {/* TODO: add chat options with reset */}
        <h4 class="jb__header__headline">Chat</h4>
        {props.handleCloseChat && (
          <button
            class="jb__close"
            title="Schließen"
            onclick={() => {
              props.handleCloseChat();
            }}>
            <IconClose/>
          </button>
        )}
      </div>
    );
  },
});
