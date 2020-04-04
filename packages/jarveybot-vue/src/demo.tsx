import Vue from 'vue';
import plugin from '@vue/composition-api';
import DemoApp from './demo-app';

Vue.use(plugin);

new Vue({
  render: (h) => h(DemoApp),
}).$mount('#jb-demo');
