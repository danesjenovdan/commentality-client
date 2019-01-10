import Vue from 'vue';
import App from './pages/Embed.vue';
import store from './store';

Vue.config.productionTip = false;

window.app = new Vue({
  store,
  render: h => h(App),
});

window.app.$mount('#app');
