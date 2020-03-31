import { defineComponent } from '@vue/composition-api';
import Chat from './Chat';

export default defineComponent({
  name: 'JarveyBot',
  setup(props) {

    return {};
  },
  render() {
    return (<Chat/>);
  },
});
