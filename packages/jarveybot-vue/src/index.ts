import {useJarveyBot} from './composition/index';
import JarveyBot from './components/JarveyBot';
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

export {useJarveyBot};
export default JarveyBot;


