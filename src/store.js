import Vue from 'vue';
import Vuex from 'vuex';

import { setJwtToken } from './requests';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    jwt: null,
  },
  mutations: {
    SET_AUTHENTICATED(state, newState) {
      state.authenticated = newState;
    },
    SET_JWT(state, newJwt) {
      state.jwt = newJwt;
    },
  },
  actions: {
    login({ commit }, jwt) {
      commit('SET_JWT', jwt);
      setJwtToken(jwt);
      commit('SET_AUTHENTICATED', true);
    },
  },
  getters: {
    authenticated: state => state.authenticated,
    jwt: state => state.jwt,
  },
});
