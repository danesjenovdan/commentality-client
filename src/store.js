import Vue from 'vue';
import Vuex from 'vuex';

import { login, setJwtToken } from './requests';

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
    login({ commit }) {
      return new Promise(async (resolve, reject) => {
        const username = window.localStorage.getItem('commentalityUser');
        const password = window.localStorage.getItem('commentalityPass');

        try {
          const jwt = await login(username, password);
          commit('SET_JWT', jwt);
          setJwtToken(jwt);
          commit('SET_AUTHENTICATED', true);
          resolve();
        } catch (error) {
          console.log(error);
          reject();
        }
      });
    },
  },
  getters: {
    authenticated: state => state.authenticated,
    jwt: state => state.jwt,
  },
});

