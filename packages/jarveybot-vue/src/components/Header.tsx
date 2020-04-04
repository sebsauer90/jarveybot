import { defineComponent } from '@vue/composition-api';
import IconClose from './icons/IconClose';
import '@jarveybot/styles/dist/scss/Header.scss';

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
