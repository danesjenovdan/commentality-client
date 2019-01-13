import Vue from 'vue';
import Vuex from 'vuex';
import { random } from 'lodash';

import { login, register, setJwtToken } from './requests';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    jwt: null,
    userId: null,
  },
  mutations: {
    SET_AUTHENTICATED(state, newState) {
      state.authenticated = newState;
    },
    SET_JWT(state, newJwt) {
      state.jwt = newJwt;
    },
    SET_USER_ID(state, newUserId) {
      state.userId = newUserId;
    },
  },
  actions: {
    login({ commit }) {
      return new Promise(async (resolve, reject) => {
        let username;
        let password;
        let newUser = false;

        username = window.localStorage.getItem('commentalityUser');
        password = window.localStorage.getItem('commentalityPass');

        if (username === null || password === null) {
          password = String(random(Number.MAX_SAFE_INTEGER));
          username = `${password}@commentality.test`;
          window.localStorage.setItem('commentalityUser', username);
          window.localStorage.setItem('commentalityPass', password);
          newUser = true;
        }

        try {
          const method = newUser ? register : login;
          const response = await method(username, password);
          commit('SET_JWT', response.jwt_token);
          commit('SET_USER_ID', response.uid);
          setJwtToken(response.jwt_token);
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
    userId: state => state.userId,
  },
});

