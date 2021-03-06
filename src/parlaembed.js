import Vue from 'vue';
import App from './pages/ParlaEmbed.vue';
import store from './store';
import i18n from './i18n';

Vue.config.productionTip = false;

window.app = new Vue({
  i18n,
  store,
  render: h => h(App),
});

window.app.$mount('#app');
