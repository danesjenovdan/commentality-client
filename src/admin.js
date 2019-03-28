import Vue from 'vue';
import Admin from './pages/Admin.vue';
import store from './store';
import i18n from './i18n';

Vue.config.productionTip = false;

window.app = new Vue({
  i18n,
  store,
  render: h => h(Admin),
});

window.app.$mount('#app');
